const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// لیست تمام api های مجاز برای درخواست
const apiList = {};

/**
 * لود کردن تمام api ها در رم برای استفاده
 * 
 * @param {*} route 
 * @param {*} dir 
 */
async function load(route, dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {

    // RULE: هر مسیری که بخواهد به عنوان endpoint استفاده شود باید این فایل را داشته باشد
    if (subdir == 'index.js') {

      // بارگزاری تمام مسیر ها در حافظه
      apiList[route] = require('../' + route);
    }
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? load(`${route}/${subdir}`, res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

/**
 * قسمت controller درخواست را از api جدا می کند
 * 
 * @param {*} url 
 */
function extractApi(url) {
  let to = url.lastIndexOf('/');
  to = to == -1 ? url.length : to + 1;
  url = url.substring(0, to);
  if (url[url.length - 1] == '/') {
    url = url.substring(0, url.length - 1);
  }
  return url;
}

function handler(req, res) {
  let self = this;

  let api = extractApi(req.baseUrl);
  let method = req.method.toUpperCase();

  let urlParts = req.baseUrl.split('/');

  // بخش آخر پرازش کننده درخواست خواهد بود
  let controller = urlParts[urlParts.length - 1];

  // در صورتی که api تعریف نشده باشد
  if (!apiList.hasOwnProperty(api)) {
    self.log.error('api not found, ' + JSON.stringify(api))
    res.status(404).send('Api not found');
  }

  else if (!apiList[api].hasOwnProperty(controller)) {
    self.log.error('controller not found, ' + JSON.stringify(api))
    res.status(404).send('Controller not found');
  }

  // در صورتی که تابع تعریف نشده باشد
  else if (!apiList[api][controller].hasOwnProperty(method)) {
    self.log.error('method not found, ' + JSON.stringify(api))
    res.status(404).send('Method not found');
  }

  else {

    let access;
    switch (method) {
      case 'POST':
      case 'post':
        // create
        access = '%c%';
        break;
      case 'GET':
      case 'get':
        // read
        access = '%r%';
        break;
      case 'PUT':
      case 'put':
        // update
        access = '%u%';
        break;
      case 'DELETE':
      case 'delete':
        // delete
        access = '%d%';
        break;
      default:
        res.status(405).send('MethodNotAllowed');
        return;
    }

    // authorize
    self.db.ACL.findAll({
      attributes: ['id'],
      where: {
        [self.db.Op.or]: [
          { user_id: req.user.id || null },
          { role: req.user.role }
        ],
        path: `${api}/${controller}`,
        access: {
          [self.db.Op.like]: access
        }
      }
    })
      .then((acl) => {
        if (!acl.length) {
          self.log.verbose(`authorization error for ${req.user.username} to ${method}:${api}/${controller}`)
          res.status(401).send('Unauthorized');
        }
        else {
          apiList[api][controller][method].call(this, req.body)
            .then(result => {
              self.log.info('api successfully called');
              res.status(200).send(result);
            })
            .catch(error => {
              self.log.error(`api call failed, ${JSON.stringify(error)}`);
              res.status(500).send('InternalServerError');
            });
        }
      })
      .catch(error => {
        self.log.error(error);
        res.status(500).send('InternalServerError');
      });
  }
}

module.exports = {
  handler: handler,
  load: load
};
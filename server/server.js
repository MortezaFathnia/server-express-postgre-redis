require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const api = require('./routes/api');
const Db = require('./libs/database');
const General = require('./routes/general');
const logger = require('./libs/logger');
const session = require('./libs/session');
const Authentication = require('./libs/authentication');

class Server {

  constructor(options) {
    let self = this;
    self.options = options;

    self.app = express();

    // create logger for specified env
    self.log = logger(self.options.env);

    self.connect2Db();
    self.attachMiddlewares();
    self.initRouter();
  }

  attachMiddlewares() {
    let self = this;

    self.app.use(cors());

    // parse application/x-www-form-urlencoded
    self.app.use(bodyParser.urlencoded({ extended: false }))
    self.app.use(bodyParser.json());

    self.app.use(session.call(self));

    self.auth = Authentication.call(this);
    self.app.use(self.auth.initialize());
    self.app.use(self.auth.session());

    self.app.use(morgan("combined", { "stream": logger.stream }));

    self.log.info(`Middlewares successfully attached.`);
  }

  connect2Db() {
    let self = this;
    self.db = Db.call(self);
  }

  initRouter() {
    let self = this;

    // به ازای تمام درخواست ها، باید نقش کاربر مشخص شود
    self.app.all('*', (req, res, next) => {

      // در صورتی که کاربر وارد سایت نشده باشد
      if (!req.user) {
        req.user = {
          role: 'guest'
        };
      }
      else {
        self.log.verbose('user: ' + JSON.stringify(req.user));
      }

      // فقط به فایل های مربوط به همان نقش دسترسی داشته باشد
      self.app.use(
        express.static(
          path.join(__dirname, '../client', req.user.role)
        )
      );

      next();
    });

    self.app.use('/api/*', function (req, res) {
      api.handler.call(self, req, res);
    });

    // درخواست های مربوط به کاربر مهمان
    let general = General.call(this);
    self.app.use(general);

    // به غیر از مسیرهای فوق، درخواست برای فایل های ثابت خواهد بود
    self.app.use('*', function (req, res, next) {

      let target = 'index.html';

      // در صورتی که آدرسی مشخص نشده باشد، فایل اصلی لود شود
      if (req.baseUrl && req.baseUrl != '/') {
        target = req.baseUrl;
      }

      self.log.verbose(`route: ${target}`);
      self.log.verbose(`role: ${req.user.role}`);
      self.log.verbose(`path: ${path.join('client', req.user.role, target)}`);

      res.sendFile(target, { root: path.join(__dirname, '../client', req.user.role) })
    });

    self.log.info(`Router successfully initialized.`);
  }

  loadApi() {
    return api.load('/api', 'server/api');
  }

  start() {
    let self = this;

    this.loadApi()
      .then(() => {
        self.log.info(`APIs successfully loaded.`);

        self.app.listen(self.options.port, () => {
          self.log.info(`server listen on ${self.options.port}`)
        });
      })
      .catch(error => {
        self.log.error(`Error while loading APIs, ${JSON.stringify(error)}`);
      });
  }
}

module.exports = Server;
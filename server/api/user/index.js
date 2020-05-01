const controller = require('./controller');

module.exports = {
  hello: {
    GET: controller.hello,
    POST: controller.hello,
    DELETE: controller.hello,
    PUT: controller.hello
  }
};
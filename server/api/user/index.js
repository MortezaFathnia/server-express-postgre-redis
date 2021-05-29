const controller = require('./controller');

module.exports = {
  hello: {
    GET: controller.getUser,
    POST: controller.hello,
    DELETE: controller.hello,
    PUT: controller.hello
  }
};
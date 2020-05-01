const controller = require('./controller');


// RULE: هر فایل index که قرار است مدیریت یک api را برعهده داشته باشد باید ساختار زیر را داشته باشد
module.exports = {
  hello: {
    GET: controller.hello,
    POST: controller.hello,
    DELETE: controller.hello,
    PUT: controller.hello
  }
};
const { body } = require('express-validator')

function registerRule() {
  return [

    // username must be an email
    body('username', 'Username must be an email')
      .not().isEmpty()
      .isEmail(),

    // password must be at least 5 chars long
    body('password', 'Password must be at least 5 characters')
      .not().isEmpty()
      .isLength({ min: 5 }),
  ];
};

module.exports = {
  Register: registerRule.call()
};
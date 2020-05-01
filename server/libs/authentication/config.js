const bcrypt = require('bcrypt');

module.exports = {
  auth_salt: bcrypt.genSaltSync(10),
  jwt_secret: 'it is for jwt'
};
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = function (sequelize) {

  class User extends Model { }

  User.init({
    // attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
    {
      sequelize,
      modelName: 'user'
      // options
    });

    return User;
};
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = function (sequelize) {

  class User extends Model { }

  User.init({
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      allowNull: false
    },
  },
    {
      sequelize,
      modelName: 'user'
      // options
    });

    return User;
};
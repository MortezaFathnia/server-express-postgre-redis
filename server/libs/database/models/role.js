const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = function (sequelize) {

  class Role extends Model { }

  Role.init({
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
    {
      sequelize,
      modelName: 'role'
      // options
    });

    return Role;
};
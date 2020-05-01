const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = function (sequelize) {

  class ACL extends Model { }

  ACL.init({
    // attributes
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true
    },
    access: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
    {
      sequelize,
      modelName: 'acl'
      // options
    });

    return ACL;
};
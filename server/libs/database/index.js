require('dotenv').config();

const Sequelize = require('sequelize');

// importing models
const User = require('./models/user');
const ACL = require('./models/acl');
const Role = require('./models/role');

module.exports = function () {
  let self = this;

  const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres',
      logging: false, // console.log
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      self.log.info('Connection has been established successfully.');
    })
    .catch(err => {
      self.log.error('Unable to connect to the database:' + err);
    });

  return {
    Op: Sequelize.Op,
    User: User(sequelize),
    ACL: ACL(sequelize),
    Role: Role(sequelize),
  };
}
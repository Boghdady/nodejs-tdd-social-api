const Sequelize = require('sequelize');

const sequelize = new Sequelize('tddDB', 'db-user', 'db-pass', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

module.exports = sequelize;

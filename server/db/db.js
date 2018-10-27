const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/graceshopper', {
  logging: false // unless I want logs
});

module.exports = db;

const { Sequelize } = require("sequelize");

const db = new Sequelize("expert_system", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;

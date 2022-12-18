const { Sequelize } = require("sequelize");

const db = new Sequelize("expert_system", "root", "", {
  host: "192.168.18.253",
  dialect: "mysql",
});

module.exports = db;

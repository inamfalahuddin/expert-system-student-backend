const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Users = db.define(
  "tbl_users",
  {
    nama_user: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    user_level: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

module.exports = Users;

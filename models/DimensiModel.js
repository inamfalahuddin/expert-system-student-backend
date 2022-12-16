const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Dimensi = db.define(
  "tbl_dimensi",
  {
    id_dimensi: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama_dimensi: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

module.exports = Dimensi;

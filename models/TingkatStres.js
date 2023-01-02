const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const TingkatStres = db.define(
  "tbl_tingkat_stres",
  {
    id_tingkat_stres: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    tingkat_stres: {
      type: DataTypes.STRING,
    },
    skala_stres: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

module.exports = TingkatStres;

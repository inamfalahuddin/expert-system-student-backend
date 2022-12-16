const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Hasil = db.define(
  "tbl_hasil",
  {
    id_hasil: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.STRING,
    },
    a_predikat: {
      type: DataTypes.FLOAT,
    },
    z: {
      type: DataTypes.FLOAT,
    },
    sesi: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    updatedAt: false,
  }
);

module.exports = Hasil;

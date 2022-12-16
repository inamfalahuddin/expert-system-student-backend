const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Keanggotaan = db.define(
  "tbl_keanggotaan",
  {
    id_keanggotaan: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_dimensi: {
      type: DataTypes.STRING,
    },
    batas_bawah: {
      type: DataTypes.FLOAT,
    },
    batas_tengah: {
      type: DataTypes.FLOAT,
    },
    batas_atas: {
      type: DataTypes.FLOAT,
    },
    keterangan: {
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

module.exports = Keanggotaan;

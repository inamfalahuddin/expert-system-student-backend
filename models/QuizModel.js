const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Pernyataan = db.define(
  "tbl_pernyataan",
  {
    id_pernyataan: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_dimensi: {
      type: DataTypes.STRING,
    },
    pernyataan: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

const Konsultasi = db.define(
  "tbl_konsultasi",
  {
    id_konsultasi: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    jawaban: {
      type: DataTypes.STRING,
    },
    sesi: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);
module.exports = { Pernyataan, Konsultasi };

const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const KonsultasiHasilDetail = db.define(
  "tbl_konsultasi_hasildetail",
  {
    id_konsultasi_hasildetail: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    z_score_total: {
      type: DataTypes.FLOAT,
    },
    sesi: {
      type: DataTypes.INTEGER,
    },
    id_tingkat_stres: {
      type: DataTypes.STRING,
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

const Stres = db.define(
  "tbl_tingkat_stres",
  {
    id_tingkat_stres: {
      type: DataTypes.STRING,
      primaryKey: true,
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

module.exports = { KonsultasiHasilDetail, Stres };

const { QueryTypes } = require("sequelize");
const db = require("../config/db");
const Dimensi = require("../models/DimensiModel");
const Keanggotaan = require("../models/KeanggotaanModel");
const response = require("./response");

const getDimensi = async (req, res) => {
  if (req.query.id === undefined) {
    try {
      // const dimensi = await Dimensi.findAll({});
      const dimensi = await db.query(
        `
          SELECT a.id_dimensi, a.nama_dimensi, b.batas_bawah, b.batas_tengah, b.batas_atas
          FROM tbl_dimensi as a
          JOIN tbl_keanggotaan as b
          ON a.id_dimensi=b.id_dimensi
          ORDER BY a.id_dimensi
        `,
        {
          type: QueryTypes.SELECT,
        }
      );

      return response(res, 200, "Success", dimensi);
    } catch (err) {
      console.log(err);
      return response(
        res,
        500,
        "Maaf terjadi kesalahan silahakan cobalagi nanti"
      );
    }
  }

  try {
    const dimensi = await Dimensi.findAll({
      where: { id_dimensi: req.query.id },
    });
    return response(res, 200, "Success", dimensi);
  } catch (err) {
    console.log(err);
    return response(
      res,
      500,
      "Maaf terjadi kesalahan silahakan cobalagi nanti"
    );
  }
};

const addDimensi = async (req, res) => {
  try {
    const count = await Dimensi.count();
    const createID =
      (count + 1).toString().length <= 1 ? `D0${count + 1}` : `D${count + 1}`;

    await Dimensi.create({
      id_dimensi: createID,
      nama_dimensi: req.body.nama_dimensi,
    });

    return response(res, 200, "Dimensi berhasil ditambahkan");
  } catch (err) {
    console.log(err);
    return response(
      res,
      500,
      "Maaf terjadi kesalahan silahakan cobalagi nanti"
    );
  }
};

const updateDimensi = async (req, res) => {
  if (req.params.id) {
    const checkDataFromDB = await Dimensi.findAll({
      where: { id_dimensi: req.params.id },
    });

    if (checkDataFromDB.length !== 0) {
      await Dimensi.update(
        {
          nama_dimensi: req.body.nama_dimensi,
        },
        { where: { id_dimensi: `${req.params.id}` } }
      );

      await Keanggotaan.update(
        {
          batas_bawah: req.body.batas_bawah,
          batas_tengah: req.body.batas_tengah,
          batas_atas: req.body.batas_atas,
        },
        {
          where: { id_dimensi: `${req.params.id}` },
        }
      );
      return response(res, 200, `Dimensi ${req.params.id} berhasil diperbarui`);
    }
    return response(res, 404, "Not Found");
  }
  return response(res, 500, "Server Error");
};

const deleteDimensi = async (req, res) => {
  const checkDataFromDB = await Dimensi.findAll({
    where: { id_dimensi: `${req.params.id}` },
  });

  if (checkDataFromDB.length !== 0) {
    await Dimensi.destroy({ where: { id_dimensi: req.params.id } });
    return response(res, 200, `Dimensi ${req.params.id} berhasil dihapus`);
  }
  return response(res, 404, `Tidak ada data dengan ID ${req.params.id}`);
};

module.exports = { getDimensi, addDimensi, updateDimensi, deleteDimensi };

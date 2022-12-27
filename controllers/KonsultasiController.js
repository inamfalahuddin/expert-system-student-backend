const { QueryTypes } = require("sequelize");
const db = require("../config/db");
const { Konsultasi } = require("../models/QuizModel");
const Users = require("../models/UserModel");
const response = require("./response");

const getKonsultasi = async (req, res) => {
  if (req.query.id === undefined) {
    try {
      const konsultasi = await db.query(
        `
        SELECT konsultasi.id_konsultasi, konsultasi.id_user, user.nama_user, konsultasi.jawaban, konsultasi.sesi
        FROM tbl_konsultasi as konsultasi
        INNER JOIN tbl_users as user 
        ON konsultasi.id_user=user.id
        ORDER BY konsultasi.id_konsultasi
      `,
        {
          type: QueryTypes.SELECT,
        }
      );

      return response(res, 200, "Success", konsultasi);
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
    if (req.query.sesi === undefined) {
      const konsultasi = await db.query(
        `
        SELECT konsultasi.id_konsultasi, konsultasi.id_user, user.nama_user, konsultasi.jawaban, konsultasi.sesi
        FROM tbl_konsultasi as konsultasi
        INNER JOIN tbl_users as user 
        ON konsultasi.id_user=user.id
        WHERE konsultasi.id_user=${req.query.id}
      `,
        {
          type: QueryTypes.SELECT,
        }
      );

      return response(res, 200, "Success", konsultasi);
    }

    const konsultasi = await db.query(
      `
      SELECT konsultasi.id_konsultasi, konsultasi.id_user, user.nama_user, konsultasi.jawaban, konsultasi.sesi
      FROM tbl_konsultasi as konsultasi
      INNER JOIN tbl_users as user 
      ON konsultasi.id_user=user.id
      WHERE konsultasi.id_user=${req.query.id} AND konsultasi.sesi=${req.query.sesi}
    `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return response(res, 200, "Success", konsultasi);
  } catch (err) {
    console.log(err);
    return response(
      res,
      500,
      "Maaf terjadi kesalahan silahakan cobalagi nanti"
    );
  }
};

const addKonsultasi = async (req, res) => {
  try {
    const count = await Konsultasi.count();

    const currentSesiByUser = await Konsultasi.findAll({
      attributes: [[db.fn("max", db.col("sesi")), "max"]],
      where: { id_user: req.body.id_user },
      raw: true,
    });

    const sesi = currentSesiByUser[0].max + 1;
    const idKonsultasi =
      (count + 1).toString().length <= 1
        ? `K00${count + 1}`
        : (count + 1).toString().length <= 2
        ? `K0${count + 1}`
        : `K${count + 1}`;

    await Konsultasi.create({
      id_konsultasi: idKonsultasi,
      id_user: req.body.id_user,
      jawaban: JSON.stringify(req.body.answer),
      sesi: sesi,
    });

    return response(res, 200, `Data ${req.body.id_user} berhasil ditambahkan`);
  } catch (err) {
    console.log(err);
    return response(res, 500, "Server Error");
  }
};

const updateKonsultasi = async (req, res) => {
  if (req.params.id) {
    const checkDataFromDB = await Konsultasi.findAll({
      where: { id_user: `${req.params.id}` },
    });

    if (checkDataFromDB.length !== 0) {
      await Konsultasi.update(
        { jawaban: JSON.stringify(req.body.answer) },
        { where: { id_user: `${req.params.id}`, sesi: req.params.sesi } }
      );
      return response(
        res,
        200,
        `Konsultasi ${req.params.id} berhasil diperbarui`
      );
    }
    return response(res, 404, "Not Found");
  }
  return response(res, 500, "Server Error");
};

const deleteKonsultasi = async (req, res) => {
  try {
    const checkUserIsExist = await Konsultasi.findOne({
      attributes: ["id_user", "id_konsultasi", "sesi"],
      where: { id_user: req.query.id, sesi: req.query.sesi },
    });

    // console.log(checkUserIsExist);
    if (checkUserIsExist !== null) {
      await Konsultasi.destroy({
        where: { id_user: req.query.id, sesi: req.query.sesi },
      });

      return response(res, 200, "delete success");
    }

    return response(res, 404, "User Not Found");
  } catch (err) {
    return response(res, 500, "Server Error");
  }

  // const checkDataFromDB = await Konsultasi.findAll({
  //   where: { id_konsultasi: `${req.params.id}` },
  // });

  // if (checkDataFromDB.length !== 0) {
  //   await Konsultasi.destroy({ where: { id_konsultasi: req.params.id } });
  //   return response(res, 200, `Konsultasi ${req.params.id} berhasil dihapus`);
  // }
  // return response(res, 404, `Tidak ada data dengan ID ${req.params.id}`);
};

module.exports = {
  getKonsultasi,
  addKonsultasi,
  updateKonsultasi,
  deleteKonsultasi,
};

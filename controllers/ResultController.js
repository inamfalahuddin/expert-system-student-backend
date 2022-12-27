const { QueryTypes } = require("sequelize");
const db = require("../config/db");
const { KonsultasiHasilDetail } = require("../models/KonsultasiHasilDetail");
const response = require("./response");

const getHasilKonsultasi = async (req, res) => {
  try {
    // if(req.query.recent)
    if (Object.keys(req.query).length > 0) {
      if (req.query.id !== undefined) {
        if (req.query.sesi) {
          console.log(req.query);
          const result = await db.query(
            `
                  SELECT a.id_konsultasi_hasildetail, a.id_user, b.nama_user, a.z_score_total, a.sesi, c.id_tingkat_stres, c.tingkat_stres
                  FROM tbl_konsultasi_hasildetail as a
                  LEFT JOIN tbl_users as b ON a.id_user=b.id
                  LEFT JOIN tbl_tingkat_stres as c ON a.id_tingkat_stres=c.id_tingkat_stres
                  WHERE a.id_user=${req.query.id} AND a.sesi=${req.query.sesi}
              `,
            {
              type: QueryTypes.SELECT,
            }
          );
          return response(res, 200, "Success", result);
        }

        const result = await db.query(
          `
                SELECT a.id_konsultasi_hasildetail, a.id_user, b.nama_user, a.z_score_total, a.sesi, c.id_tingkat_stres, c.tingkat_stres
                FROM tbl_konsultasi_hasildetail as a
                LEFT JOIN tbl_users as b ON a.id_user=b.id
                LEFT JOIN tbl_tingkat_stres as c ON a.id_tingkat_stres=c.id_tingkat_stres
                WHERE a.id_user=${req.query.id}
            `,
          {
            type: QueryTypes.SELECT,
          }
        );

        return response(res, 200, "Success", result);
      }

      if (req.query.recent !== undefined) {
        const result = await db.query(
          `
            SELECT  a.id_konsultasi_hasildetail, b.id, b.nama_user, a.z_score_total, max(a.sesi) as sesi, a.id_tingkat_stres
            FROM tbl_konsultasi_hasildetail as a
            RIGHT JOIN tbl_users as b ON a.id_user=b.id
            WHERE a.id_konsultasi_hasildetail IS NOT NULL
            GROUP BY b.createdAt DESC
            LIMIT ${Number(req.query.recent)}
          `,
          {
            type: QueryTypes.SELECT,
            where: { id_user: `${req.query.id}` },
          }
        );

        return response(res, 200, "Success", result);
      }
    }

    if (req.query.limit !== undefined) {
      const result = await db.query(
        `
          SELECT a.id_konsultasi_hasildetail, a.id_user, b.nama_user, b.username, a.z_score_total, a.sesi, c.id_tingkat_stres, c.tingkat_stres
          FROM tbl_konsultasi_hasildetail as a
          LEFT JOIN tbl_users as b ON a.id_user=b.id
          LEFT JOIN tbl_tingkat_stres as c ON a.id_tingkat_stres=c.id_tingkat_stres
          ORDER BY a.createdAt DESC
          LIMIT ${Number(req.query.limit)}
        `,
        {
          type: QueryTypes.SELECT,
          where: { id_user: `${req.query.id}` },
        }
      );

      return response(res, 200, "Success", result);
    }

    const result = await db.query(
      `
          SELECT a.id_konsultasi_hasildetail, a.id_user, b.nama_user, a.z_score_total, a.sesi, c.id_tingkat_stres, c.tingkat_stres
          FROM tbl_konsultasi_hasildetail as a
          LEFT JOIN tbl_users as b ON a.id_user=b.id
          LEFT JOIN tbl_tingkat_stres as c ON a.id_tingkat_stres=c.id_tingkat_stres
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return response(res, 200, "Success", result);
  } catch (err) {
    console.log(err);
    return response(res, 500, "Internal Server Error");
  }
};

const deleteHasilKonsultasi = async (req, res) => {
  try {
    const checkUserIsExist = await KonsultasiHasilDetail.findOne({
      attributes: ["id_user", "id_konsultasi_hasildetail", "sesi"],
      where: { id_user: req.query.id, sesi: req.query.sesi },
    });

    // console.log(checkUserIsExist);
    if (checkUserIsExist !== null) {
      await KonsultasiHasilDetail.destroy({
        where: { id_user: req.query.id, sesi: req.query.sesi },
      });

      return response(res, 200, "delete success");
    }

    return response(res, 404, "User Not Found");
  } catch (err) {
    return response(res, 500, "Server Error");
  }
};

// const addKonsultasi = async (req, res) => {
//   try {
//     const count = await Konsultasi.count();

//     const currentSesiByUser = await Konsultasi.findAll({
//       attributes: [[db.fn("max", db.col("sesi")), "max"]],
//       where: { id_user: req.body.id_user },
//       raw: true,
//     });

//     const sesi = currentSesiByUser[0].max + 1;
//     const idKonsultasi =
//       (count + 1).toString().length <= 1
//         ? `K00${count + 1}`
//         : (count + 1).toString().length <= 2
//         ? `K0${count + 1}`
//         : `K${count + 1}`;

//     await Konsultasi.create({
//       id_konsultasi: idKonsultasi,
//       id_user: req.body.id_user,
//       jawaban: JSON.stringify(req.body.answer),
//       sesi: sesi,
//     });

//     return response(res, 200, `Data ${req.body.id_user} berhasil ditambahkan`);
//   } catch (err) {
//     console.log(err);
//     return response(res, 500, "Server Error");
//   }
// };

// const updateKonsultasi = async (req, res) => {
//   if (req.params.id) {
//     const checkDataFromDB = await Konsultasi.findAll({
//       where: { id_user: `${req.params.id}` },
//     });

//     if (checkDataFromDB.length !== 0) {
//       await Konsultasi.update(
//         { jawaban: JSON.stringify(req.body.answer) },
//         { where: { id_user: `${req.params.id}`, sesi: req.params.sesi } }
//       );
//       return response(
//         res,
//         200,
//         `Konsultasi ${req.params.id} berhasil diperbarui`
//       );
//     }
//     return response(res, 404, "Not Found");
//   }
//   return response(res, 500, "Server Error");
// };

// const deleteKonsultasi = async (req, res) => {
//   const checkDataFromDB = await Konsultasi.findAll({
//     where: { id_konsultasi: `${req.params.id}` },
//   });

//   if (checkDataFromDB.length !== 0) {
//     await Konsultasi.destroy({ where: { id_konsultasi: req.params.id } });
//     return response(res, 200, `Konsultasi ${req.params.id} berhasil dihapus`);
//   }
//   return response(res, 404, `Tidak ada data dengan ID ${req.params.id}`);
// };

module.exports = {
  getHasilKonsultasi,
  deleteHasilKonsultasi,
};

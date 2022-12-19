const { Sequelize } = require("sequelize");
const Dimensi = require("../models/DimensiModel");
const Hasil = require("../models/HasilModel");
const Keanggotaan = require("../models/KeanggotaanModel");
const { Pernyataan, Konsultasi } = require("../models/QuizModel");
const Users = require("../models/UserModel");
const response = require("./response");

const questions = async (req, res) => {
  try {
    const questions = await Pernyataan.findAll({
      attributes: ["id_pernyataan", "pernyataan"],
    });

    return response(res, 200, "Success", { questions });
  } catch (err) {
    console.log(err);
    return response(res, 500, "Maaf terjadi kesalahan silahakan cobalagi nanti");
  }
};

const answers = async (req, res) => {
  const { username, answers } = req.body;

  if (answers.length != 12) {
    return response(
      res,
      417,
      "Harapan tidak terpenuhi, jawaban harus memiliki panjang 12"
    );
  }

  try {
    const user = await Users.findOne(
      { attributes: ["id"] },
      { where: { username } }
    );

    const idUser = user.id;
    const idKonsultasi = `K${Math.ceil(Math.random() * 1000)}`;
    const idHasil = `H${Math.ceil(Math.random() * 1000)}`;

    const currentSesi = await Hasil.findAll({
      attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
      where: { id_user: idUser },
      raw: true,
    });
    const sesi = currentSesi[0].max + 1;

    // create answer of array for save into database
    const answer = [];
    answers.map((val) => answer.push(val.value));

    // await Konsultasi.create({
    //   id_konsultasi: idKonsultasi,
    //   id_user: idUser,
    //   jawaban: JSON.stringify(answer),
    //   sesi: sesi,
    // });

    // find alpha
    const dimensi = await Dimensi.findAll({ attributes: ["id_dimensi"] });
    const pernyataan = await Pernyataan.findAll({
      attributes: ["id_pernyataan", "id_dimensi"],
    });

    const keanggotaan = await Keanggotaan.findAll({
      attributes: [
        "id_keanggotaan",
        "id_dimensi",
        "batas_bawah",
        "batas_tengah",
        "batas_atas",
      ],
    });

    //  find batas_bawah and batas_atas
    let d = [
      {
        batas: {
          bawah: 0,
          tengah: 0,
          atas: 0,
        },
        value: [],
      },
      {
        batas: {
          bawah: 0,
          tengah: 0,
          atas: 0,
        },
        value: [],
      },
      {
        batas: {
          bawah: 0,
          tengah: 0,
          atas: 0,
        },
        value: [],
      },
    ];

    const IdDimensiOfArr = [];
    const IdKeanggotaanArr = [];
    dimensi.map((val) => IdDimensiOfArr.push(val.id_dimensi));
    keanggotaan.map((val) => IdKeanggotaanArr.push(val.id_keanggotaan));

    pernyataan.map((val) => {
      for (let i = 0; i < 3; i++) {
        if (val.id_dimensi == [IdDimensiOfArr[i]]) {
          d[i].batas.bawah = keanggotaan[i].batas_bawah;
          d[i].batas.tengah = keanggotaan[i].batas_tengah;
          d[i].batas.atas = keanggotaan[i].batas_atas;
          d[i].value.push(val.id_pernyataan);
        }
      }
    });

    let resultOfAlpha = [];
    for (let i = 0; i < d.length; i++) {
      resultOfAlpha.push(alpha(sumValue(answers, d[i].value), d[i].batas));
    }

    // for (let i = 0; i < IdDimensiOfArr.length - 1; i++) {
    //   await Hasil.create({
    //     id_hasil: idHasil + i,
    //     id_user: idUser,
    //     id_dimensi: IdDimensiOfArr[i],
    //     id_keanggotaan: IdKeanggotaanArr[i],
    //     sesi: sesi,
    //     alpha: resultOfAlpha[i],
    //   });
    // }

    // response
    return response(res, 200, "Data berhasil ditambahkan", { alpha: resultOfAlpha });
  } catch (err) {
    console.log(err);
    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const getAnswer = async (req, res) => {
  console.log(req.query);
  try {
    if (Object.keys(req.query).length === 0) {
      const answers = await Konsultasi.findAll({});
      return response(res, 200, "Success", { answers });
    } else {
      const answers = await Konsultasi.findOne(
        {},
        { where: { id_user: req.query.id } }
      );
      return response(res, 200, "Success", { answers });
    }
  } catch (err) {
    console.log(err);
    return response(res, 500, "Maaf! Terjadi kesalahan pada server");
  }
};

const alpha = (x = 0, y) => {
  const ringan =
    Math.abs((x - 0) / (y.bawah - 0)) <
    Math.abs((y.tengah - x) / (y.tengah - y.bawah))
      ? [Math.abs((x - 0) / (y.bawah - 0)), "naik"]
      : [Math.abs((y.tengah - x) / (y.tengah - y.bawah)), "turun"];

  const sedang =
    Math.abs((x - y.bawah) / (y.tengah - y.bawah)) <
    Math.abs((y.atas - x) / (y.atas - y.tengah))
      ? [Math.abs((x - y.bawah) / (y.tengah - y.bawah)), "naik"]
      : [Math.abs((y.atas - x) / (y.atas - y.tengah)), "turun"];

  const berat =
    Math.abs((x - y.tengah) / (y.atas - y.tengah)) < 1
      ? [Math.abs((x - y.tengah) / (y.atas - y.tengah)), "naik"]
      : [1, "turun"];

  const alphaForIndexing = [ringan[0], sedang[0], berat[0]];
  const alphaArray = [ringan, sedang, berat];

  // console.log(alphaArr[indexed]);
  const indexed = alphaForIndexing.indexOf(
    Math.min(ringan[0], sedang[0], berat[0])
  );

  const zRingan =
    alphaArray[indexed][1] == "naik"
      ? Math.abs(alphaArray[indexed][0] * (y.bawah - 0) + 0)
      : Math.abs(alphaArray[indexed][0] * (y.tengah - y.bawah) - y.tengah);

  const zSedang =
    alphaArray[indexed][1] == "naik"
      ? Math.abs(alphaArray[indexed][0] * (y.tengah - y.bawah) + y.bawah)
      : Math.abs(alphaArray[indexed][0] * (y.atas - y.tengah) - y.atas);

  const zBerat =
    alphaArray[indexed][1] == "naik"
      ? Math.abs(alphaArray[indexed][0] * (y.atas - y.tengah) + y.tengah)
      : Math.abs(alphaArray[indexed][0] * (1 - y.atas) - 1);

  const zScore = [zRingan, zSedang, zBerat];
  const z = zScore[indexed];

  return {
    alpha: Number(Math.min(ringan[0], sedang[0], berat[0]).toFixed(2)),
    z: z,
  };
};

// console.log(dimensi1(9));
const sumValue = (answers, dimensi) => {
  let result = 0;
  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < dimensi.length; j++) {
      if (answers[i].id_pernyataan == dimensi[j]) {
        result += answers[i].value;
      }
    }
  }
  return result;
};

module.exports = { questions, answers, getAnswer };

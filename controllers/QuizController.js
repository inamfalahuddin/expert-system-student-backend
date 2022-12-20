const { Sequelize } = require("sequelize");
const Hasil = require("../models/HasilModel");
const { KonsultasiHasilDetail } = require("../models/KonsultasiHasilDetail");
const { Pernyataan, Konsultasi } = require("../models/QuizModel");
const Users = require("../models/UserModel");
const {
  alpha,
  aPredikat,
  Z,
  zScore,
  stresRange,
} = require("./InferenceController");
const response = require("./response");

const questions = async (req, res) => {
  try {
    const questions = await Pernyataan.findAll({
      attributes: ["id_pernyataan", "pernyataan"],
    });

    return response(res, 200, "Success", { questions });
  } catch (err) {
    console.log(err);
    return response(
      res,
      500,
      "Maaf terjadi kesalahan silahakan cobalagi nanti"
    );
  }
};

const getAnswer = async (req, res) => {
  const { id } = req.query;

  try {
    if (Object.keys(req.query).length === 0) {
      const answers = await Konsultasi.findAll({});
      return response(res, 200, "Success", { answers });
    }

    const currentSesiByUser = await Konsultasi.findAll({
      attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
      where: { id_user: id },
      raw: true,
    });
    const answers = await Konsultasi.findOne({
      where: { id_user: id, sesi: currentSesiByUser[0].max },
    });
    return response(res, 200, "Success", { answers });
  } catch (err) {
    console.log(err);
    return response(res, 500, "Maaf! Terjadi kesalahan pada server");
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
    const questionsByDimensi = await Pernyataan.findAll({
      attributes: ["id_pernyataan", "id_dimensi"],
    });
    // push to table konsultasi
    _addTableKonsultasi(username, answers, questionsByDimensi);

    // push to table hasil
    const a = await alpha(_answerByDimensi(questionsByDimensi, answers));
    const alphaPredikat = aPredikat(a);
    const z = await Z(alphaPredikat);

    _addTableHasil(username, a, alphaPredikat, z);

    _addTableKonsultasiHasilDetail(username, alphaPredikat, z);

    return response(res, 200, "Data berhasil ditambahkan");
  } catch (err) {
    console.log(err);
    return response(res, 500, "Terjadi kesalahan pada server");
  }
  return response(res, 404, "Not Found");
};

const getResult = async (req, res) => {
  const { id } = req.query;
  try {
    const currentSesiByUser = await Hasil.findAll({
      attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
      where: { id_user: id },
      raw: true,
    });

    const inference = await Hasil.findAll({
      attributes: ["a", "a_predikat", "z", "sesi"],
      where: { id_user: id, sesi: currentSesiByUser[0].max },
    });

    return response(res, 200, "Ok Berhasil", { inference });
    console.log(inference)
  } catch (err) {
    console.log(err);
  }
  return response(res, 500, "Server Error");
};


const _answerByDimensi = (questionsByDimensi, answers) => {
  let d1 = 0;
  let d2 = 0;
  let d3 = 0;

  questionsByDimensi.map((val) => {
    if (val.id_dimensi == "D01") {
      const indexed = parseInt(val.id_pernyataan.match(/\d+/g)) - 1;
      d1 += answers[indexed];
    }
    if (val.id_dimensi == "D02") {
      const indexed = parseInt(val.id_pernyataan.match(/\d+/g)) - 1;
      d2 += answers[indexed];
    }
    if (val.id_dimensi == "D03") {
      const indexed = parseInt(val.id_pernyataan.match(/\d+/g)) - 1;
      d3 += answers[indexed];
    }
  });

  return [d1, d2, d3];
};

const _addTableKonsultasi = async (username, answers, questionsByDimensi) => {
  const count = await Konsultasi.count();
  const idUser = await Users.findOne({
    attributes: ["id"],
    where: { username: username },
  });
  const currentSesiByUser = await Konsultasi.findAll({
    attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
    where: { id_user: idUser.id },
    raw: true,
  });
  const sesi = currentSesiByUser[0].max + 1;
  const idKonsultasi =
    (count + 1).toString().length <= 1
      ? `K00${count + 1}`
      : (count + 1).toString().length <= 2
      ? `K0${count + 1}`
      : `K${count + 1}`;

  const answerByDimensi = _answerByDimensi(questionsByDimensi, answers);
  await Konsultasi.create({
    id_konsultasi: idKonsultasi,
    id_user: idUser.id,
    jawaban: JSON.stringify(answerByDimensi),
    sesi: sesi,
  });
};

const _addTableHasil = async (username, a, alphaPredikat, z) => {
  const count = await Hasil.count();
  const idUser = await Users.findOne({
    attributes: ["id"],
    where: { username: username },
  });
  const currentSesiByUser = await Hasil.findAll({
    attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
    where: { id_user: idUser.id },
    raw: true,
  });
  const sesi = currentSesiByUser[0].max + 1;

  for (let i = 0; i < z.length; i++) {
    let idHasil =
      (count + i).toString().length <= 1
        ? `H000${count + i}`
        : (count + i).toString().length <= 2
        ? `H00${count + i}`
        : (count + i).toString().length <= 3
        ? `H0${count + i}`
        : `H${count + i}`;

    await Hasil.create({
      id_hasil: idHasil,
      id_user: idUser.id,
      a: JSON.stringify(a[i]),
      a_predikat: alphaPredikat[i],
      z: z[i],
      sesi: sesi,
    });
  }
};

const _addTableKonsultasiHasilDetail = async (username, alphaPredikat, z) => {
  const count = await KonsultasiHasilDetail.count();

  let idKonsultasi =
    (count + 1).toString().length <= 1
      ? `KHD000${count + 1}`
      : (count + 1).toString().length <= 2
      ? `KHD00${count + 1}`
      : (count + 1).toString().length <= 3
      ? `KHD0${count + 1}`
      : `KHD${count + 1}`;

  const idUser = await Users.findOne({
    attributes: ["id"],
    where: { username: username },
  });

  const currentSesiByUser = await KonsultasiHasilDetail.findAll({
    attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
    where: { id_user: idUser.id },
    raw: true,
  });

  const sesi = currentSesiByUser[0].max + 1;

  await KonsultasiHasilDetail.create({
    id_konsultasi_hasildetail: idKonsultasi,
    id_user: idUser.id,
    z_score_total: zScore(alphaPredikat, z),
    sesi: sesi,
    id_tingkat_stres: stresRange(zScore(alphaPredikat, z)),
  });
};

module.exports = { questions, answers, getAnswer, getResult };
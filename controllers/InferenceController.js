const { TingkatStres } = require("../data/rule-base");
const Keanggotaan = require("../models/KeanggotaanModel");

const ruleBased = async () => {
  let dimensi = [];

  const rule = await Keanggotaan.findAll({
    attributes: ["id_dimensi", "batas_bawah", "batas_tengah", "batas_atas"],
  });

  rule.map((val) => {
    dimensi.push({
      dimensi: val.id_dimensi,
      himpunan: {
        ringan: [val.batas_bawah, val.batas_tengah],
        sedang: [val.batas_bawah, val.batas_tengah, val.batas_atas],
        berat: [val.batas_tengah, val.batas_atas],
      },
    });
  });

  return dimensi;
};

const ringan = (x, low, high) => {
  if (x < low) return 1;
  if (x >= low && x <= high) return (high - x) / (high - low);
  if (x > high) return 0;
};

const zRingan = (x, low, high) => {
  const alpha = x * (high - low) - high;
  return Math.abs(alpha);
};

const sedang = (x, low, middle, high) => {
  if (x < low) return 0;
  if (x >= low && x <= middle) return (x - low) / (middle - low);
  if (x >= middle && x <= high) return (high - x) / (high - middle);
  if (x > high) return 1;
};

const zSedang = (x, low, middle, high) => {
  let alpha =
    x >= low && x <= middle
      ? x * (middle - low) + low
      : x * (high - middle) - high;

  return Math.abs(alpha);
};

const berat = (x, low, high) => {
  if (x < low) return 0;
  if (x >= low && x <= high) return (x - low) / (high - low);
  if (x > high) return 1;
};

const zBerat = (x, low, high) => {
  let alpha = x * (high - low) + low;

  return Math.abs(alpha);
};

const alpha = async (answers) => {
  const rule = await ruleBased();
  const kategori = ["ringan", "sedang", "berat"];

  let a = [];
  for (let i = 0; i < kategori.length; i++) {
    for (let j = 0; j < kategori.length; j++) {
      for (let k = 0; k < kategori.length; k++) {
        a.push([
          kategori[i] == "ringan"
            ? Number(
                ringan(
                  answers[0],
                  rule[0].himpunan.ringan[0],
                  rule[0].himpunan.ringan[1]
                ).toFixed(2)
              )
            : kategori[i] == "sedang"
            ? Number(
                sedang(
                  answers[0],
                  rule[0].himpunan.sedang[0],
                  rule[0].himpunan.sedang[1],
                  rule[0].himpunan.sedang[2]
                ).toFixed(2)
              )
            : kategori[i] == "berat"
            ? Number(
                berat(
                  answers[0],
                  rule[0].himpunan.berat[0],
                  rule[0].himpunan.berat[1]
                ).toFixed(2)
              )
            : "",
          kategori[j] == "ringan"
            ? Number(
                ringan(
                  answers[1],
                  rule[1].himpunan.ringan[0],
                  rule[1].himpunan.ringan[1]
                )
              )
            : kategori[j] == "sedang"
            ? Number(
                sedang(
                  answers[1],
                  rule[1].himpunan.sedang[0],
                  rule[1].himpunan.sedang[1],
                  rule[1].himpunan.sedang[2]
                ).toFixed(2)
              )
            : kategori[j] == "berat"
            ? Number(
                berat(
                  answers[1],
                  rule[1].himpunan.berat[0],
                  rule[1].himpunan.berat[1]
                ).toFixed(2)
              )
            : "",
          kategori[k] == "ringan"
            ? Number(
                ringan(
                  answers[2],
                  rule[2].himpunan.ringan[0],
                  rule[2].himpunan.ringan[1]
                ).toFixed(2)
              )
            : kategori[k] == "sedang"
            ? Number(
                sedang(
                  answers[2],
                  rule[2].himpunan.sedang[0],
                  rule[2].himpunan.sedang[1],
                  rule[2].himpunan.sedang[2]
                ).toFixed(2)
              )
            : kategori[k] == "berat"
            ? Number(
                berat(
                  answers[2],
                  rule[2].himpunan.berat[0],
                  rule[2].himpunan.berat[1]
                ).toFixed(2)
              )
            : "",
        ]);
      }
    }
  }

  return a;
};

const aPredikat = (alpha) => {
  let result = [];
  for (let i = 0; i < alpha.length; i++) {
    result.push(Math.min(...alpha[i]));
  }

  return result;
};

const Z = async (aPredikat) => {
  const rule = await ruleBased();
  const tingkatStres = TingkatStres;

  let result = [];
  for (let i = 0; i < tingkatStres.length; i++) {
    tingkatStres[i] == "ringan"
      ? result.push(
          Number(
            zRingan(
              aPredikat[i],
              rule[3].himpunan.ringan[0],
              rule[3].himpunan.ringan[1]
            ).toFixed(2)
          )
        )
      : tingkatStres[i] == "sedang"
      ? result.push(
          Number(
            zSedang(
              aPredikat[i],
              rule[3].himpunan.sedang[0],
              rule[3].himpunan.sedang[1],
              rule[3].himpunan.sedang[2]
            ).toFixed(2)
          )
        )
      : tingkatStres[i] == "berat"
      ? result.push(
          Number(
            zBerat(
              aPredikat[i],
              rule[3].himpunan.berat[0],
              rule[3].himpunan.berat[1]
            ).toFixed(2)
          )
        )
      : "null";
  }
  return result;
};

const zScore = (aPredikat, z) => {
  let resultOfZ = 0;
  let resultOfAlpha = 0;
  for (let i = 0; i < z.length; i++) {
    resultOfZ += z[i] * aPredikat[i];
    resultOfAlpha += aPredikat[i];
  }

  return Number((resultOfZ / resultOfAlpha).toFixed(2));
};

const stresRange = (zScore) => {
  if (zScore > 7 && zScore < 18) return "TS01";
  if (zScore > 17 && zScore <= 26) return "TS02";
  if (zScore >= 26 && zScore <= 36) return "TS03";

  return "TS00";
};

module.exports = { alpha, aPredikat, Z, zScore, stresRange };

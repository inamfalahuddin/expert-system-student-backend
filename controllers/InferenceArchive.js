const perasaanBerubah = 9;
const tidakTerkendali = 5;
const terbebaniLebih = 4;

const tingkatStres = [
  "ringan",
  "ringan",
  "sedang",
  "ringan",
  "sedang",
  "sedang",
  "sedang",
  "sedang",
  "berat",
  "sedang",
  "sedang",
  "sedang",
  "sedang",
  "berat",
  "berat",
  "berat",
  "berat",
  "berat",
  "sedang",
  "berat",
  "berat",
  "berat",
  "berat",
  "berat",
  "berat",
  "berat",
  "berat",
];

const rule = [
  {
    dimensi: "Perasaan Berubah-ubah",
    himpunan: {
      ringan: [7, 14],
      sedang: [7, 14, 21],
      berat: [14, 21],
    },
  },
  {
    dimensi: "Perasaan tidak terkendali",
    himpunan: {
      ringan: [16.5, 24.75],
      sedang: [16.5, 24.75, 33],
      berat: [24.75, 33],
    },
  },
  {
    dimensi: "Perasaan terbebani lebih",
    himpunan: {
      ringan: [3, 6],
      sedang: [3, 6, 9],
      berat: [6, 9],
    },
  },
  {
    dimensi: "Tingkat Stres",
    himpunan: {
      ringan: [12, 24],
      sedang: [12, 24, 36],
      berat: [24, 36],
    },
  },
];

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

const kategori = ["ringan", "sedang", "berat"];

let alpha = [];
for (let i = 0; i < kategori.length; i++) {
  for (let j = 0; j < kategori.length; j++) {
    for (let k = 0; k < kategori.length; k++) {
      alpha.push([
        kategori[i] == "ringan"
          ? ringan(
              perasaanBerubah,
              rule[0].himpunan.ringan[0],
              rule[0].himpunan.ringan[1]
            )
          : kategori[i] == "sedang"
          ? sedang(
              perasaanBerubah,
              rule[0].himpunan.sedang[0],
              rule[0].himpunan.sedang[1],
              rule[0].himpunan.sedang[2]
            )
          : kategori[i] == "berat"
          ? berat(
              perasaanBerubah,
              rule[0].himpunan.berat[0],
              rule[0].himpunan.berat[1]
            )
          : "",
        kategori[j] == "ringan"
          ? ringan(
              tidakTerkendali,
              rule[1].himpunan.ringan[0],
              rule[1].himpunan.ringan[1]
            )
          : kategori[j] == "sedang"
          ? sedang(
              tidakTerkendali,
              rule[1].himpunan.sedang[0],
              rule[1].himpunan.sedang[1],
              rule[1].himpunan.sedang[2]
            )
          : kategori[j] == "berat"
          ? berat(
              tidakTerkendali,
              rule[1].himpunan.berat[0],
              rule[1].himpunan.berat[1]
            )
          : "",
        kategori[k] == "ringan"
          ? ringan(
              terbebaniLebih,
              rule[2].himpunan.ringan[0],
              rule[2].himpunan.ringan[1]
            )
          : kategori[k] == "sedang"
          ? sedang(
              terbebaniLebih,
              rule[2].himpunan.sedang[0],
              rule[2].himpunan.sedang[1],
              rule[2].himpunan.sedang[2]
            )
          : kategori[k] == "berat"
          ? berat(
              terbebaniLebih,
              rule[2].himpunan.berat[0],
              rule[2].himpunan.berat[1]
            )
          : "",
      ]);
    }
  }
}

let aPredikat = [];
for (let i = 0; i < alpha.length; i++) {
  aPredikat.push(Math.min(...alpha[i]));
}

let z = [];
for (let i = 0; i < tingkatStres.length; i++) {
  tingkatStres[i] == "ringan"
    ? z.push(
        zRingan(
          aPredikat[i],
          rule[3].himpunan.ringan[0],
          rule[3].himpunan.ringan[1]
        )
      )
    : tingkatStres[i] == "sedang"
    ? z.push(
        zSedang(
          aPredikat[i],
          rule[3].himpunan.sedang[0],
          rule[3].himpunan.sedang[1],
          rule[3].himpunan.sedang[2]
        )
      )
    : tingkatStres[i] == "berat"
    ? z.push(
        zBerat(
          aPredikat[i],
          rule[3].himpunan.berat[0],
          rule[3].himpunan.berat[1]
        )
      )
    : "null";
}

const zScore = (aPredikat, z) => {
  let resultOfZ = 0;
  let resultOfAlpha = 0;
  for (let i = 0; i < z.length; i++) {
    resultOfZ += z[i] * aPredikat[i];
    resultOfAlpha += aPredikat[i];
  }

  return resultOfZ / resultOfAlpha;
};

const stres = (zScore) => {
  if (zScore > 7 && zScore < 18) return "Stres ringan";
  if (zScore > 17 && zScore <= 26) return "Stres sedang";
  if (zScore >= 26 && zScore <= 36) return "Stres berat";

  return "Normal";
};

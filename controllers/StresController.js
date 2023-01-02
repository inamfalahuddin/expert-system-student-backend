const TingkatStres = require("../models/TingkatStres");
const response = require("./response");

const getTingkatStres = async (req, res) => {
  try {
    const tingkatStres = await TingkatStres.findAll({});

    return response(res, 200, "Success", tingkatStres);
  } catch (err) {
    console.log(err);
    return response(res, 500, err.response.message);
  }
};

module.exports = { getTingkatStres };

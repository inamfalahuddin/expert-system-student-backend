const jwt = require("jsonwebtoken");
const response = require("../controllers/response");

const TokenVerify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === undefined || token === "") {
    return response(res, 403, "Forbiden! Pastikan anda sudah memiliki token");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return response(res, 403, "Token tidak valid");
    }

    req.username = decoded.username;
    next();
  });
};

module.exports = TokenVerify;

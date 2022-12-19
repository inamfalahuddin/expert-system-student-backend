const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const response = require("./response");

const RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return response(res, 403, "Forbiden");

    const user = await Users.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) return response(res, 403, "Forbiden");

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return response(res, 403, "Forbidden");
        const { id, nama_user, username } = user;

        const accessToken = jwt.sign(
          { id, nama_user, username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5s" }
        );

        return response(res, 200, "Success", { accessToken });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = RefreshToken;

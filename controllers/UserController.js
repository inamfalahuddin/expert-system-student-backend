const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const { KonsultasiHasilDetail } = require("../models/KonsultasiHasilDetail");
const Users = require("../models/UserModel");
const response = require("./response");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "nama_user", "username", "user_level"],
    });
    response(res, 200, "Success", users);
  } catch (err) {
    console.log(err);
    response(res, 500, "Maaf terjadi kesalahan silahakan cobalagi nanti");
  }
};

const register = async (req, res) => {
  const { nama, username, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const idUser = `201110${Math.ceil(Math.random() * 1000)}`;

  try {
    const user = await Users.findOne({ where: { username } });

    if (user === null) {
      Users.create({
        id: idUser,
        nama_user: nama,
        username: username,
        password: hashPassword,
        user_level: "user",
      });

      return response(res, 200, "Register berhasil");
    } else {
      return response(res, 400, "Username sudah digunakan");
    }
  } catch (err) {
    return response(res, 400, "Register gagal");
  }
  return response(res, 500, "Server error gais");
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.body.username },
    });

    if (user === null) {
      return response(res, 404, "Username tidak terdaftar");
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return response(res, 404, "Passsword salah");
    }

    const { id, nama_user, username, user_level } = user;
    const accessToken = jwt.sign(
      { id, nama_user, username, user_level },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { id, nama_user, username, user_level },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    try {
      await Users.update(
        { refresh_token: refreshToken },
        { where: { username } }
      );
    } catch (err) {
      console.log(err);
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true
    });
    return response(res, 200, "Success", { accessToken });
  } catch (err) {
    console.log(err);
  }
  return response(res, 503, "Server Error");
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return response(res, 204, "Tidak ada kontent");

  const user = await Users.findOne({ where: { refresh_token: refreshToken } });

  if (!user) return response(res, 204, "Tidak ada refresh token");

  const { username } = user;
  await Users.update({ refresh_token: null }, { where: { username } });

  return response(res, 200, "Berhasil logout");
};

const stress = async (req, res) => {
  const { id, session } = req.query;

  try {
    if (id !== undefined) {
      const result = await KonsultasiHasilDetail.findAll({
        where: { id_user: id },
      });

      const currentSesiByUser = await KonsultasiHasilDetail.findAll({
        attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
        where: { id_user: id },
        raw: true,
      });

      if (result.length > 0) {
        if (session !== undefined) {
          if (session == 0) {
            const result = await KonsultasiHasilDetail.findOne({
              where: { id_user: id, sesi: currentSesiByUser[0].max },
            });
            return response(res, 200, "Berhasil", { resultOfStress: result });
          }

          if (session > currentSesiByUser[0].max) {
            return response(res, 404, "Tidak ada data");
          }

          if (session > 0) {
            const result = await KonsultasiHasilDetail.findOne({
              where: { id_user: id, sesi: session },
            });
            return response(res, 200, "Berhasil", { resultOfStress: result });
          }
        }
        return response(res, 200, "Berhasil", { resultOfStress: result });
      }
      return response(res, 404, "Tidak ada data");
    }
    // return response(res, 404, "Tidak ada data");
  } catch (err) {
    return response(res, 200, "Server Error");
  }

  // if (id != undefined || session != undefined) {
  //   const currentSesiByUser = await KonsultasiHasilDetail.findAll({
  //     attributes: [[Sequelize.fn("max", Sequelize.col("sesi")), "max"]],
  //     where: { id_user: id },
  //     raw: true,
  //   });

  //   const result = await KonsultasiHasilDetail.findAll({
  //     where: { id_user: id, sesi: currentSesiByUser[0].max },
  //   });

  //   console.log(result.length);
  //   return response(res, 200, "Berhasil", { resultOfStress: result });
  // }

  const result = await KonsultasiHasilDetail.findAll({});
  return response(res, 200, "Berhasil", { resultOfStress: result });
};

const deleteUser = async (req, res) => {
  const checkDataFromDB = await Users.findAll({
    where: { id: `${req.params.id}` },
  });

  if (checkDataFromDB.length !== 0) {
    await Users.destroy({ where: { id: req.params.id } });
    return response(res, 200, `user ${req.params.id} berhasil dihapus`);
  }
  return response(res, 404, `Tidak ada data dengan ID ${req.params.id}`);
};

const updateUser = async (req, res) => {
  if (req.params.id) {
    const checkDataFromDB = await Users.findAll({
      where: { id: req.params.id },
    });

    if (checkDataFromDB.length !== 0) {
      await Users.update(
        {
          nama_user: req.body.nama_user,
          username: req.body.username,
          user_level: req.body.user_level,
        },
        { where: { id: `${req.params.id}` } }
      );
      return response(res, 200, `Dimensi ${req.params.id} berhasil diperbarui`);
    }
    return response(res, 404, "Not Found");
  }
  return response(res, 500, "Server Error");
};

module.exports = {
  getUsers,
  register,
  login,
  logout,
  stress,
  deleteUser,
  updateUser,
};

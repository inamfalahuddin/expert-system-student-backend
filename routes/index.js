const express = require("express");
const {
  getDimensi,
  addDimensi,
  updateDimensi,
  deleteDimensi,
} = require("../controllers/DimensiController.js");
const {
  getKonsultasi,
  addKonsultasi,
  updateKonsultasi,
  deleteKonsultasi,
} = require("../controllers/KonsultasiController.js");
const {
  questions,
  answers,
  getAnswer,
  getResult,
} = require("../controllers/QuizController.js");
const { getHasilKonsultasi } = require("../controllers/ResultController.js");
const RefreshToken = require("../controllers/TokenController.js");
const {
  getUsers,
  register,
  login,
  logout,
  stress,
  deleteUser,
  updateUser,
} = require("../controllers/UserController.js");

const welcome = require("../controllers/WelcomeController.js");
const TokenVerify = require("../middleware/TokenVerify.js");
const router = express.Router();

// user
router.get("/", welcome);
router.get("/users", TokenVerify, getUsers);
router.get("/user/token", RefreshToken);
router.post("/user/register", register);
router.post("/user/login", login);
router.delete("/user/logout", logout);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);
router.get("/user/result", TokenVerify, stress);

// quiz
router.get("/quiz/questions", TokenVerify, questions);
router.post("/quiz/answers", TokenVerify, answers); //TokenVerify
router.get("/quiz/answers", TokenVerify, getAnswer);
router.get("/quiz/inference", getResult);

// dimensi
router.get("/dimensi", getDimensi);
router.post("/dimensi", addDimensi);
router.put("/dimensi/:id", updateDimensi);
router.delete("/dimensi/:id", deleteDimensi);

// konsultasi
router.get("/konsultasi", getKonsultasi);
router.post("/konsultasi", addKonsultasi);
router.put("/konsultasi/:id/:sesi", updateKonsultasi);
router.delete("/konsultasi/:id/", deleteKonsultasi);

// hasil
router.get("/result", getHasilKonsultasi);

module.exports = router;

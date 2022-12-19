const express = require("express");
const {
  questions,
  answers,
  getAnswer,
  getResult,
} = require("../controllers/QuizController.js");
const RefreshToken = require("../controllers/TokenController.js");
const {
  getUsers,
  register,
  login,
  logout,
  stress,
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
router.get("/user/result", stress);

// quiz
router.get("/quiz/questions", TokenVerify, questions);
router.post("/quiz/answers", answers); //TokenVerify
router.get("/quiz/answers", getAnswer);
router.get("/quiz/inference", getResult);

module.exports = router;

const response = require("./response");

const welcome = (req, res) => {
  response(res, 200, "Welcome to my API");
};

module.exports = welcome;

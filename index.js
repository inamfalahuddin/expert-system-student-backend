const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/index");

const app = express();

dotenv.config();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(process.env.DATABASE);
  console.log(`es-stress app listening on port ${process.env.PORT}`);
});

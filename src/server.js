const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const { auth } = require("./src/utils/auth");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });
const { transporter, verify } = require("./src/utils/mailer");

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
connect();
verify(transporter);

app.use(express.json());

app.use(morgan("dev"));

server.listen(port, () => {
  console.log("Estamos al aire");
});

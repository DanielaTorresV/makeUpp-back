const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const { auth } = require("./utils/auth");
const morgan = require("morgan");
require("dotenv").config();
const userRouter = require("./routes/user");
//const { transporter, verify } = require("./src/utils/mailer");

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
connect();
//verify(transporter);

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Estamos al aire");
});

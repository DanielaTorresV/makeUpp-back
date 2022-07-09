const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const morgan = require("morgan");
require("dotenv").config();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
//const { transporter, verify } = require("./utils/mailer");

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
connect();
//verify(transporter);

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log("Estamos al aire");
});

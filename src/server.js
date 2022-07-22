const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const morgan = require("morgan");
require("dotenv").config();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const boxRouter = require("./routes/box");
const purchaseDetailRouter = require("./routes/purchaseDetail");
const { transporter, verify } = require("./utils/mailer");

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
connect();
verify(transporter);

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/boxes", boxRouter);
app.use("/purchases", purchaseDetailRouter);

app.listen(port, () => {
  console.log("Estamos al aire");
});

const { Schema, model } = require("mongoose");

const boxSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      default: 50000,
    },
    idLastProduct: {
      type: String,
    },
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Box = model("Box", boxSchema);

module.exports = Box;

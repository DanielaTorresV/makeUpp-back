const { Schema, model } = require("mongoose");

const purchaseDetailSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    user: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    box: {
      type: [{ type: Schema.Types.ObjectId, ref: "Box" }],
    },
  },
  {
    timestamps: true,
  }
);

const PurchaseDetail = model("PurchaseDetail", purchaseDetailSchema);

module.exports = PurchaseDetail;

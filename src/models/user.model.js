const { Schema, model, models } = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailRegex, "Email is not valid"],
      validate: {
        async validator(email) {
          const user = await models.User.findOne({ email });
          return !user;
        },
        message: "Email already exists",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isManager: {
      type: Boolean,
      default: false,
    },
    purchaseDetails: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "PurchaseDetail",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

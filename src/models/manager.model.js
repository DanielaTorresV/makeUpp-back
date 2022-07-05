const { Schema, model, models } = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const managerSchema = new Schema(
  {    
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
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    },
  },
  {
    timestamps: true,
  }
);

const Manager = model("Manager", managerSchema);

module.exports = Manager;
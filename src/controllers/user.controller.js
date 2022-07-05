const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/;

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ data: "Contraseña poco segura" });
      }
      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        name,
        email,
        password: encPassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User was created",
        data: {
          token,
          email: user.email,
        },
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `User could not register: error: ${err}` });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("User or password not valid");
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User was logged",
        data: {
          token,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error: ${err}` });
    }
  },

  async destroy(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User destroyed", data: user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not be destroyed", data: err });
    }
  },
};

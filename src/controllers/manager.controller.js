const Manager = require("../models/manager.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const manager = await Manager.findOne({ email });
      if (!user) {
        throw new Error("Manager or password not valid");
      }
      const isValid = await bcrypt.compare(password, manager.password);
      if (!isValid) {
        throw new Error("Manager or password not valid");
      }
      const token = jwt.sign({ id: manager._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "Manager was logged",
        data: {
          token,
          email: manager.email,
        },
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `Manager could not login: error: ${err}` });
    }
  },
};

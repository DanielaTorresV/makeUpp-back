const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authManager = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Session expired");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Session expired");
    }

    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = id;

    if (!User.findById(id)) {
      throw new Error("User does not exist");
    }

    if (id !== process.env.ID_ADMI) {
      throw new Error("User does not manager to the App");
    }

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/").delete(auth, userController.destroy);

module.exports = router;

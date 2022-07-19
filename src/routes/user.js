const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/myuser").get(auth, userController.show);
router.route("/").put(auth, userController.update);
router.route("/getemail").post(userController.getemail);
router.route("/recovered-password").put(auth, userController.recoveredpassword);
router.route("/").delete(auth, userController.destroy);

module.exports = router;

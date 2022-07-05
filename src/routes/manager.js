const router = require("express").Router();
const managerController = require("../controllers/manager.controller");

router.route("/login").post(managerController.login);

module.exports = router;

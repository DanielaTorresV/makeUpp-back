const router = require("express").Router();
const boxController = require("../controllers/box.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, boxController.list);
router.route("/:boxId").get(boxController.show);
router.route("/:productId").post(auth, boxController.create);
router.route("/:boxId").put(auth, boxController.update);
router.route("/:boxId").delete(auth, boxController.destroy);

module.exports = router;

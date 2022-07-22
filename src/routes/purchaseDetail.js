const router = require("express").Router();
const purchaseDetailController = require("../controllers/purchaseDetail.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, purchaseDetailController.list);
router.route("/:purchaseId").get(purchaseDetailController.show);
router.route("/:boxId").post(auth, purchaseDetailController.create);
router.route("/:purchaseId").put(auth, purchaseDetailController.update);
router.route("/:purchaseId").delete(auth, purchaseDetailController.destroy);

module.exports = router;

const router = require("express").Router();
const productController = require("../controllers/product.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, productController.list);
router.route("/:productId").get(productController.show);
router.route("/").post(auth, productController.create);
router.route("/:productId").put(productController.update);
router.route("/:productId").delete(productController.destroy);

module.exports = router;

const router = require("express").Router();
const productController = require("../controllers/product.controller");
const { authManager } = require("../utils/authManager");
const { formData } = require("../utils/formData");

router.route("/").get(productController.list);
router.route("/:productId").get(productController.show);
router.route("/").post(authManager, formData, productController.create);
router.route("/:productId").put(authManager, productController.update);
router.route("/:productId").delete(authManager, productController.destroy);

module.exports = router;

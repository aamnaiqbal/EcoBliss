const express = require("express");
const cartController = require("../Controllers/cartController");
const router = express.Router();

router.route("/add").post(cartController.addItemToCart);
router.route("/:id").get(cartController.getCart);
router.route("/:customerId/:productId").patch(cartController.updateQuantity);
router.route("/:customerId/:cartItemId").delete(cartController.deleteProduct);

module.exports = router;

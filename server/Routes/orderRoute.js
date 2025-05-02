const orderController = require("../Controllers/orderController");
const express = require("express");

const router = express.Router();
router.route("/").post(orderController.placeOrder);
router
  .route("/updateOrderStatus/:orderId/:vendorId")
  .post(orderController.updateOrderStatus);
router.route("/:vendorId").get(orderController.getVendorOrders);
module.exports = router;

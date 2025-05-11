const orderController = require("../Controllers/orderController");
const express = require("express");

const router = express.Router();
router
  .route("/")
  .post(orderController.placeOrder)
  .get(orderController.getNonPendingOrders);

router.post("/payfast-notify", orderController.handlePayFastIPN);
router.post("/payfast/verify", orderController.verifyPayFastReturn);

router
  .route("/updateOrderStatus/:orderId/:vendorId")
  .post(orderController.updateOrderStatus);
router.route("/:vendorId").get(orderController.getVendorOrders);
// router.route("/").get(orderController.getVendorOrders);
router
  .route("/acceptOrderShipmentRequest/:orderId/:subOrderId")
  .post(orderController.acceptOrderShipmentRequest);
module.exports = router;

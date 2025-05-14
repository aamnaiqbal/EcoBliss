const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");

router.route("/login").post(adminController.login);
router.route("/getAllVendors").get(adminController.getAllVendors);
router.route("/getTotalVendors").get(adminController.getTotalVendors);
router.route("/getTotalPlants").get(adminController.getTotalPlants);
router.route("/getTotalCustomers").get(adminController.getTotalBuyers);
router.route("/getTotalSales").get(adminController.getTotalSales);
router
  .route("/getTopSellingCategories")
  .get(adminController.getTopSellingCategories);

module.exports = router;

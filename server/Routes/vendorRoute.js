const express = require("express");
const vendorController = require("../Controllers/vendorController");
const validateVendor = require("../Middlewares/validateVendorMiddleware");
const upload = require("../Middlewares/multerMiddleware");
const router = express.Router();

router.route("/signup").post(validateVendor, vendorController.signUp);
router.route("/login").post(vendorController.login);
router.route("/verify-otp").post(vendorController.verifyOTP);
router.route("/resend-otp").post(vendorController.resendOTP);

router.route("/plants/:vendorId").get(vendorController.getVendorPlants);
router
  .route("/plants/:id/:vendorId")
  .get(vendorController.getVendorPlant)
  .delete(vendorController.deletePlant);

router
  .route("/plants/:id")
  .patch(upload.array("images", 4), vendorController.updatePlant);

module.exports = router;

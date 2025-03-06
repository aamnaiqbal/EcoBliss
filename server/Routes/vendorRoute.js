const express = require("express");
const vendorController = require("../Controllers/vendorCOntroller");
const validateVendor = require("../Middlewares/validateVendorMiddleware");
const router = express.Router();

router.route("/signup").post(validateVendor, vendorController.signUp);
router.route("/login").post(vendorController.login);
router.route("/verify-otp").post(vendorController.verifyOTP);
router.route("/resend-otp").post(vendorController.resendOTP);

module.exports = router;

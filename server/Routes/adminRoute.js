const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");

router.route("/login").post(adminController.login);

module.exports = router;

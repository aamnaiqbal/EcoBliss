const vendorSchema = require("../utils/validator/vendorValidator");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const validateVendor = asyncErrorHandler(async (req, res, next) => {
  vendorSchema.parse(req.body);
  console.log("Hello");
  next();
});

module.exports = validateVendor;

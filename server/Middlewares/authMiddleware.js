const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");
const util = require("util");
const jwt = require("jsonwebtoken");
const Vendor = require("../Models/vendorModel");
module.exports = asyncErrorHandler(async (req, res, next) => {
  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("bearer"))
    token = testToken.split(" ")[1];
  if (!token) next(new customError("You are not loggedd in", 401));
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_STR
  );
  const vendor = await Vendor.findById(decodedToken.id);
  if (!vendor)
    next(new customError("The user with the given token does nt exist."));

  req.vendor = vendor;
  next();
});

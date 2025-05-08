const asyncErrorHandler = require("../utils/asyncErrorHandler");
const signToken = require("../utils/signToken");
const customError = require("../utils/customError");

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const _id = process.env.ADMIN_ID;
  if (!email || !password)
    return next(
      new customError("Please provide email and password for login.", 400)
    );
  if (email !== adminEmail || password !== adminPassword)
    return next(new customError("Incorrect email or password"));
  const token = signToken(_id, "admin");
  res
    .status(200)
    .json({ status: "success", message: "Login Successful", token });
});

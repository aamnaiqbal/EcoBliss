const customError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Vendor = require("../Models/vendorModel");
const Plant = require("../Models/plantModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const signToken = require("../utils/signToken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOTP() {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; //set expiry time 5 minutes from now
  return { otp, expiresAt };
}

//Signup
exports.signUp = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  let vendor = await Vendor.findOne({ email });
  if (vendor) {
    return next(
      new customError("The vendor with this email already exists.", 400)
    );
  }
  const { otp, expiresAt } = generateOTP();
  req.body.otp = otp;
  req.body.otpExpiry = expiresAt;
  vendor = await Vendor.create(req.body);
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
  });
  res.status(201).json({
    status: "success",
    message: "Vendor registered. Please verify OTP sent to email.",
    data: {
      vendor,
    },
  });
});

//Verify OTP
exports.verifyOTP = asyncErrorHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  let vendor = await Vendor.findOne({ email });
  if (!vendor) {
    return next(new customError("Vendor not found", 404));
  }
  if (vendor.isVerified) {
    return next(new customError("Vendor already verified.", 400));
  }
  if (vendor.otp !== otp || vendor.otpExpiry < Date.now()) {
    return next(new customError("Invalid or expired OTP.", 400));
  }
  vendor.isVerified = true;
  vendor.otp = undefined;
  vendor.expiryDate = undefined;
  await vendor.save();

  res.status(200).json({
    status: "success",
    message: "Email verified successfully, You can now login",
  });
});

//Resend OTP
exports.resendOTP = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(
      new customError(
        "Please provide email for sending OTP resending request.",
        400
      )
    );
  let vendor = await Vendor.findOne({ email });
  if (!vendor) {
    return next(new customError("Vendor not found.", 404));
  }
  if (vendor.isVerified) {
    return next(new customError("Vendor already verified.", 400));
  }
  const { otp, expiresAt } = generateOTP();
  vendor.otp = otp;
  vendor.otpExpiry = expiresAt;
  await vendor.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // receiver address
    subject: "Resend OTP Verification",
    text: `Your new OTP is ${otp}`,
  });
  res.status(200).json({
    status: "success",
    message: "OTP has resent successfully.",
  });
});

//Login vendor
exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new customError("Please provide email and password for login.", 400)
    );
  const vendor = await Vendor.findOne({ email });
  if (!vendor || !(await comparePasswordInDB(password, vendor.password))) {
    return next(new customError("Incorrect email or password.", 400));
  }
  if (!vendor.isVerified) {
    return next(new customError("Email not verified. Please verify OTP.", 400));
  }
  const token = signToken(vendor._id, "vendor");
  res.status(200).json({
    status: "success",
    message: "Login Successful",
    token,
    data: {
      vendor,
    },
  });
});

exports.getVendorPlants = asyncErrorHandler(async (req, res, next) => {
  const { vendorId } = req.params;
  const plants = await Plant.find({ vendorId });
  if (plants.length == 0) {
    return next(new customError("No products found for this vendor.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      plants,
    },
  });
});

exports.getVendorPlant = asyncErrorHandler(async (req, res, next) => {
  console.log(req.params);
  const plant = await Plant.findOne({
    _id: req.params.id,
    vendorId: req.params.vendorId,
  });
  if (!plant) {
    return next(new customError("Plant details not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      plant,
    },
  });
});

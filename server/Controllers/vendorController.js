const customError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Vendor = require("../Models/vendorModel");
const Plant = require("../Models/plantModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const signToken = require("../utils/signToken");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");
const fs = require("fs");

function generateOTP() {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; //set expiry time 5 minutes from now
  return { otp, expiresAt };
}

//Signup
exports.signUp = asyncErrorHandler(async (req, res, next) => {
  console.log("Body", req.body);
  const nurseryName = req.body.nurseryName;
  const bankAccountNo = req.body.bankAccountNo;
  const cnic = req.body.cnic;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email } = req.body;
  let vendor = await Vendor.findOne({ email });
  if (vendor) {
    return next(
      new customError("The vendor with this email already exists.", 400)
    );
  }
  // Check if vendor with the same nurseryName already exists
  vendor = await Vendor.findOne({ nurseryName });
  if (vendor) {
    return next(
      new customError("The vendor with this nursery name already exists.", 400)
    );
  }

  // Check if vendor with the same CNIC already exists
  vendor = await Vendor.findOne({ cnic });
  if (vendor) {
    return next(
      new customError("The vendor with this CNIC already exists.", 400)
    );
  }

  // Check if vendor with the same bankAccountNo already exists
  vendor = await Vendor.findOne({ bankAccountNo });
  if (vendor) {
    return next(
      new customError(
        "The vendor with this bank account number already exists.",
        400
      )
    );
  }
  const { otp, expiresAt } = generateOTP();
  req.body.otp = otp;
  req.body.otpExpiry = expiresAt;
  vendor = await Vendor.create(req.body);
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

// //Verify OTP
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

// //Resend OTP
exports.resendOTP = asyncErrorHandler(async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
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
  if (
    !vendor ||
    !(await vendor.comparePasswordInDB(password, vendor.password))
  ) {
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

function getPublicId(url) {
  const parts = url.split("/");
  const filename = parts[parts.length - 1]; // Get the last part (filename)
  return filename.split(".")[0]; // return publicId
}

exports.deletePlant = asyncErrorHandler(async (req, res, next) => {
  const vendorId = req.params.vendorId;
  const productId = req.params.id;
  // console.log(vendorId, productId);
  const plant = await Plant.findOne({ _id: productId, vendorId });
  if (!plant) return next(new customError("Produt not found or unauthorized."));
  let publicIds = [];
  publicIds.push(getPublicId(plant.image));
  if (plant.subImg.subImg1) publicIds.push(getPublicId(plant.subImg.subImg1));
  if (plant.subImg.subImg2) publicIds.push(getPublicId(plant.subImg.subImg2));
  if (plant.subImg.subImg3) publicIds.push(getPublicId(plant.subImg.subImg3));
  // console.log(publicIds);
  // Delete multiple images
  await deleteFromCloudinary(publicIds);
  // console.log("deleted");

  await Plant.findByIdAndDelete(productId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updatePlant = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;
  const vendorId = req.body.vendorId;
  // console.log(vendorId);

  const plant = await Plant.findOne({ _id: productId, vendorId });
  if (!plant)
    return next(new customError("Product not found or unauthorized."));
  //Store uploaded images URLs
  let imagePaths = [];
  //Upload on CLoudinary
  if (req.files && req.files.length > 0) {
    for (let file of req.files) {
      const localFilePath = file.path; //path whre Multer saved the file
      const uploadResult = await uploadOnCloudinary(localFilePath);
      if (uploadResult) {
        imagePaths.push(uploadResult.url); //Store cloudinary url
        fs.unlinkSync(localFilePath);
        console.log("Uploaded successfully.");
      } else {
        return next(new customError("Cloudinary upload failed.", 500));
      }
    }
  }
  let publicIdsToDelete = [];
  const updatedImages = JSON.parse(req.body.updatedImages);
  delete req.body.updatedImages;
  // Identify which old images should be deleted
  if (updatedImages.main && plant.image) {
    publicIdsToDelete.push(getPublicId(plant.image));
  }
  if (updatedImages.subImg1 && plant.subImg?.subImg1) {
    publicIdsToDelete.push(getPublicId(plant.subImg.subImg1));
  }
  if (updatedImages.subImg2 && plant.subImg?.subImg2) {
    publicIdsToDelete.push(getPublicId(plant.subImg.subImg2));
  }
  if (updatedImages.subImg3 && plant.subImg?.subImg3) {
    publicIdsToDelete.push(getPublicId(plant.subImg.subImg3));
  }
  // Update images with new ones
  req.body.image = updatedImages.main ? imagePaths.shift() : plant.image;
  req.body.subImg = {
    subImg1: updatedImages.subImg1 ? imagePaths.shift() : plant.subImg?.subImg1,
    subImg2: updatedImages.subImg2 ? imagePaths.shift() : plant.subImg?.subImg2,
    subImg3: updatedImages.subImg3 ? imagePaths.shift() : plant.subImg?.subImg3,
  };

  await deleteFromCloudinary(publicIdsToDelete);

  const updatedPlant = await Plant.findByIdAndUpdate(
    { _id: productId },
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedPlant,
    },
  });
});

const fs = require("fs");
const Plant = require("../Models/plantModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");
const Vendor = require("../Models/vendorModel");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.getAllPlants = asyncErrorHandler(async (req, res, next) => {
  const plants = await Plant.find();
  res.status(200).json({
    status: "success",
    data: {
      plants,
    },
  });
});

// exports.addPlant= asyncErrorHandler(async(req,res,next)=>{
//     const plant= await Plant.create(req.body);
//     res.status(201).json({
//         status: 'success',
//         data: {
//             plant
//         }
//     })
// });

exports.getPlant = asyncErrorHandler(async (req, res, next) => {
  const plant = await Plant.findById(req.params.id);
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

exports.getPopularPlants = asyncErrorHandler(async (req, res, next) => {
  const popularPlants = await Plant.find({ popular: true }).select(
    "name size category image subImg"
  );
  if (!popularPlants) {
    return next(new customError("No popular plants not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      popularPlants,
    },
  });
});

//vendor specific

exports.addPlant = asyncErrorHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    next(new customError("No files uploaded", 400));
  }
  const { vendorId } = req.body;
  // console.log(req.body);
  const vendor = Vendor.findById(vendorId);
  if (!vendor) return next(new customError("Vendor not found.", 404));

  //Store uploaded images URLs
  let imagePaths = [];
  //Upload on CLoudinary
  for (let file of req.files) {
    const localFilePath = file.path; //path whre Multer saved the file
    const uploadResult = await uploadOnCloudinary(localFilePath);
    if (uploadResult) {
      imagePaths.push(uploadResult.url); //Store cloudinary url
      fs.unlinkSync(localFilePath);
    } else {
      return next(new customError("Cloudinary upload failed.", 500));
    }
  }
  req.body.image = imagePaths[0];
  req.body.subImg = {
    subImg1: imagePaths[1] || null,
    subImg2: imagePaths[2] || null,
    subImg3: imagePaths[3] || null,
  };

  // console.log(req.body);
  const plant = await Plant.create(req.body);
  // console.log("iploaded");
  res.status(201).json({
    status: "success",
    data: {
      plant,
    },
  });
});

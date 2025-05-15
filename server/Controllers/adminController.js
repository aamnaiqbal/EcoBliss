const asyncErrorHandler = require("../utils/asyncErrorHandler");
const signToken = require("../utils/signToken");
const customError = require("../utils/customError");
const Vendor = require("../Models/vendorModel");
const Plant = require("../Models/plantModel");
const Order = require("../Models/orderModel");

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

// exports.getAllVendors = asyncErrorHandler(async (req, res, next) => {
//   const vendors = await Vendor.find({ isVerified: true }).select(
//     "_id fullName email nurseryName address"
//   );
//   res.status(200).json({
//     status: "success",
//     data: {
//       vendors,
//     },
//   });
// });

exports.getAllVendors = asyncErrorHandler(async (req, res, next) => {
  // Step 1: Get verified vendors
  const vendors = await Vendor.find({ isVerified: true }).select(
    "_id fullName email phoneNo nurseryName address "
  );

  // Step 2: Aggregate total earnings per vendor (from all subOrders)
  const earningsData = await Order.aggregate([
    { $unwind: "$subOrders" },
    // { $match: { "subOrders.paymentStatus": "Paid" } },
    {
      $group: {
        _id: "$subOrders.vendorId",
        totalEarnings: { $sum: "$subOrders.totalAmount" },
      },
    },
  ]);

  // Step 3: Aggregate plant count per vendor
  const plantCounts = await Plant.aggregate([
    {
      $group: {
        _id: "$vendorId",
        totalPlants: { $sum: 1 },
      },
    },
  ]);

  // Step 4: Convert both results to Maps for easy lookup
  const earningsMap = new Map();
  earningsData.forEach((item) => {
    earningsMap.set(item._id.toString(), item.totalEarnings);
  });

  const plantCountMap = new Map();
  plantCounts.forEach((item) => {
    plantCountMap.set(item._id.toString(), item.totalPlants);
  });

  // Step 5: Merge everything into final vendor response
  const enrichedVendors = vendors.map((vendor) => ({
    _id: vendor._id,
    fullName: vendor.fullName,
    email: vendor.email,
    nurseryName: vendor.nurseryName,
    address: vendor.address,
    phoneNo: vendor.phoneNo,
    totalEarnings: Math.round(
      (earningsMap.get(vendor._id.toString()) || 0) * 0.85
    ),

    totalPlants: plantCountMap.get(vendor._id.toString()) || 0,
  }));

  res.status(200).json({
    status: "success",
    data: {
      vendors: enrichedVendors,
    },
  });
});

exports.getTotalVendors = asyncErrorHandler(async (req, res, next) => {
  const totalVendors = await Vendor.countDocuments();
  res.status(200).json({ status: "success", data: totalVendors });
});

exports.getTotalPlants = asyncErrorHandler(async (req, res, next) => {
  const totalPlants = await Plant.countDocuments();
  res.status(200).json({ status: "success", data: totalPlants });
});

exports.getTotalBuyers = asyncErrorHandler(async (req, res, next) => {
  const uniqueBuyerCount = await Order.distinct("customerId").then(
    (buyers) => buyers.length
  );

  res.status(200).json({ status: "success", data: uniqueBuyerCount });
});

exports.getTotalSales = asyncErrorHandler(async (req, res, next) => {
  const result = await Order.aggregate([
    // {
    //   //Only include completed/paid orders
    //   $match: { status: "completed" }
    // },
    {
      $group: {
        _id: null,
        totalProductSales: { $sum: "$totalAmount" },
        totalShippingRevenue: { $sum: "$shippingCharges" },
      },
    },
  ]);

  const totalProductRevenue = result[0]?.totalProductSales || 0;
  const totalShippingRevenue = result[0]?.totalShippingRevenue || 0;

  res.status(200).json({
    status: "success",
    data: {
      totalProductRevenue,
      totalShippingRevenue,
      totalRevenue: totalProductRevenue + totalShippingRevenue,
    },
  });
});

exports.getTopSellingCategories = asyncErrorHandler(async (req, res, next) => {
  const result = await Order.aggregate([
    { $unwind: "$subOrders" }, // First level: subOrders
    { $unwind: "$subOrders.items" }, // Second level: items inside subOrders

    {
      $match: {
        "subOrders.items.modelType": "Plant",
      },
    },

    {
      $lookup: {
        from: "plants", // collection name must be lowercase and plural if auto-generated
        localField: "subOrders.items.productId",
        foreignField: "_id",
        as: "plantInfo",
      },
    },
    { $unwind: "$plantInfo" },

    {
      $group: {
        _id: "$plantInfo.category", // group by category
        totalSold: { $sum: "$subOrders.items.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
  ]);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

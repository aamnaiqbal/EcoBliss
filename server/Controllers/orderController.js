const Order = require("../Models/orderModel");
const Cart = require("../Models/cartModel");
const Plant = require("../Models/plantModel");
const PlantCare = require("../Models/plantCareModel");
const customError = require("../utils/customError");
const moment = require("moment");

const mongoose = require("mongoose");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.placeOrder = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.body);
  const { customerId, shippingCharges, paymentMethod, shippingDetails } =
    req.body;

  // Fetch customer cart
  const cart = await Cart.findOne({ customerId });
  // console.log("cart ", cart);
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Group products by vendor
  const vendorOrders = {};
  let totalAmount = 0;
  let totalItems = 0;

  for (const item of cart.items) {
    const vendorId = item.vendorId.toString();

    // If vendor does not exist in orders, create a new entry
    if (!vendorOrders[vendorId]) {
      vendorOrders[vendorId] = {
        _id: new mongoose.Types.ObjectId(), // Generate unique ID for sub-order
        vendorId,
        items: [],
        totalAmount: 0,
        totalItems: 0,
        status: "Pending",
      };
    }

    let product;
    if (item.productType === "Plant") {
      product = await Plant.findById(item.productId);
    } else if (item.productType === "PlantCare") {
      product = await PlantCare.findById(item.productId);
    }

    console.log(product);

    // Add item to vendor's sub-order
    vendorOrders[vendorId].items.push({
      productId: item.productId.toString(),
      modelType: item.productType,
      quantity: item.quantity,
      size: item.size,
      price: product.size[item.size],
    });
    // Update total amount for vendor and overall order
    const itemTotal = item.quantity * product.size[item.size];
    vendorOrders[vendorId].totalAmount += itemTotal;
    vendorOrders[vendorId].totalItems += item.quantity;
    totalAmount += itemTotal;
    console.log(vendorOrders);
  }

  // Create Order
  const order = await Order.create({
    customerId,
    subOrders: Object.values(vendorOrders),
    shippingCharges,
    totalAmount,
    paymentMethod,
    shippingDetails,
  });

  // Clear Cart After Order
  await Cart.deleteOne({ customerId });

  res.status(201).json({
    status: "success",
    order,
  });
});

//Get vendor Order
exports.getVendorOrders = asyncErrorHandler(async (req, res, next) => {
  let { vendorId } = req.params;
  const { status } = req.query; //status filter from query params
  console.log("vendorId:", vendorId, "status:", status);

  vendorId = new mongoose.Types.ObjectId(vendorId);

  const matchStage = {
    "subOrders.vendorId": vendorId,
  };

  // 👇 Add status filter if provided
  if (status && status !== "All") {
    matchStage["subOrders.status"] = status;
  }

  const orders = await Order.aggregate([
    {
      $match: {
        "subOrders.vendorId": vendorId,
      },
    },
    { $unwind: "$subOrders" },
    {
      $match: matchStage,
    },
    { $unwind: "$subOrders.items" },
    {
      $addFields: {
        "subOrders.items.productId": {
          $toObjectId: "$subOrders.items.productId",
        },
      },
    },
    {
      $lookup: {
        from: "plants",
        localField: "subOrders.items.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $addFields: {
        "subOrders.items.productDetails": {
          $arrayElemAt: ["$productDetails", 0],
        },
      },
    },
    {
      $group: {
        _id: {
          orderId: "$_id",
          subOrderId: "$subOrders._id",
        },
        customerId: { $first: "$customerId" },
        createdAt: { $first: "$createdAt" },
        paymentMethod: { $first: "$paymentMethod" },
        paymentStatus: { $first: "$paymentStatus" },
        shippingCharges: { $first: "$shippingCharges" },
        shippingDetails: { $first: "$shippingDetails" },
        totalAmount: { $first: "$totalAmount" },
        vendorId: { $first: "$subOrders.vendorId" },
        status: { $first: "$subOrders.status" },
        items: { $push: "$subOrders.items" },
        subOrderTotalAmount: { $first: "$subOrders.totalAmount" },
        subOrderTotalItems: { $first: "$subOrders.totalItems" },
      },
    },
    {
      $group: {
        _id: "$_id.orderId",
        customerId: { $first: "$customerId" },
        createdAt: { $first: "$createdAt" },
        paymentMethod: { $first: "$paymentMethod" },
        paymentStatus: { $first: "$paymentStatus" },
        shippingCharges: { $first: "$shippingCharges" },
        shippingDetails: { $first: "$shippingDetails" },
        totalAmount: { $first: "$totalAmount" },
        subOrders: {
          $push: {
            _id: "$_id.subOrderId",
            vendorId: "$vendorId",
            status: "$status",
            items: "$items",
            totalAmount: "$subOrderTotalAmount",
            totalItems: "$subOrderTotalItems",
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        customerId: 1,
        createdAt: 1,
        paymentMethod: 1,
        paymentStatus: 1,
        shippingCharges: 1,
        shippingDetails: 1,
        totalAmount: 1,
        subOrders: 1,
      },
    },
  ]);

  // Format createdAt
  orders.forEach((order) => {
    order.createdAtFormatted = moment(order.createdAt).format(
      "ddd, MMMM D, YYYY"
    );
  });

  res.status(200).json({
    status: "success",
    data: orders,
  });
});

exports.updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
  const { status } = req.body;
  const { orderId, vendorId } = req.params;
  console.log(orderId, vendorId, status);

  let order = await Order.findById(orderId);
  console.log(order);
  if (!order) return next(new customError("Order not found", 404));

  let vendorOrder = order.subOrders.find(
    (suborder) => suborder.vendorId.toString() === vendorId
  );
  if (!vendorOrder)
    return next(
      new customError("Unauthorized: You cannot update this order", 404)
    );

  // console.log(vendorOrder);
  // Update status for vendor-specific part of the order
  vendorOrder.status = status;
  vendorOrder.shipmentRequestedAt = Date.now();
  await order.save();

  res.status(200).json({
    status: "success",
    message: "Order status updated",
    data: vendorOrder,
  });
});

//admin
// exports.getNonPendingOrders = asyncErrorHandler(async (req, res, next) => {
//   const { filter } = req.query;

//   // Define the allowed filters and their corresponding statuses
//   const statusFilters = {
//     All: ["Ready to ship", "Shipped", "Delivered"],
//     "Ready to ship": ["Ready to ship"],
//     Shipped: ["Shipped"],
//     Delivered: ["Delivered"],
//   };

//   const allowedStatuses = statusFilters[filter] || statusFilters["All"]; // Default to 'All'

//   const subOrders = await Order.aggregate([
//     { $unwind: "$subOrders" },

//     {
//       $match: {
//         "subOrders.status": { $in: allowedStatuses },
//       },
//     },
//     {
//       $lookup: {
//         from: "vendors",
//         localField: "subOrders.vendorId",
//         foreignField: "_id",
//         as: "vendorDetails",
//       },
//     },

//     { $unwind: "$vendorDetails" },

//     {
//       $project: {
//         _id: 0,
//         subOrderId: "$subOrders._id",
//         status: "$subOrders.status",
//         totalAmount: "$subOrders.totalAmount",
//         totalItems: "$subOrders.totalItems",
//         items: "$subOrders.items",
//         shipmentRequestedAt: "$subOrders.shipmentRequestedAt",
//         shipmentAcceptedAt: "$subOrders.shipmentAcceptedAt",
//         vehicleType: "$subOrders.vehicleType",
//         orderId: "$_id",
//         customerId: 1,
//         shippingDetails: 1,
//         createdAt: 1,
//         vendor: {
//           _id: "$vendorDetails._id",
//           fullName: "$vendorDetails.fullName",
//           nurseryName: "$vendorDetails.nurseryName",
//           phoneNo: "$vendorDetails.phoneNo",
//           email: "$vendorDetails.email",
//           nurseryAddress: "$vendorDetails.address",
//         },
//       },
//     },
//   ]);

//   res.status(200).json({ success: true, data: subOrders });
// });

exports.getNonPendingOrders = asyncErrorHandler(async (req, res, next) => {
  const { filter } = req.query;

  // Define the allowed filters and their corresponding statuses
  const statusFilters = {
    All: ["Ready to ship", "Shipped", "Delivered"],
    "Ready to ship": ["Ready to ship"],
    Shipped: ["Shipped"],
    Delivered: ["Delivered"],
  };

  const allowedStatuses = statusFilters[filter] || statusFilters["All"];

  const subOrders = await Order.aggregate([
    { $unwind: "$subOrders" },

    { $match: { "subOrders.status": { $in: allowedStatuses } } },

    { $unwind: "$subOrders.items" },

    // Convert productId to ObjectId
    {
      $addFields: {
        "subOrders.items.productId": {
          $toObjectId: "$subOrders.items.productId",
        },
      },
    },

    // Lookup product details from 'plants'
    {
      $lookup: {
        from: "plants",
        localField: "subOrders.items.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },

    // Attach the first matching product to the item
    {
      $addFields: {
        "subOrders.items.productDetails": {
          $arrayElemAt: ["$productDetails", 0],
        },
      },
    },

    // Lookup vendor details
    {
      $lookup: {
        from: "vendors",
        localField: "subOrders.vendorId",
        foreignField: "_id",
        as: "vendorDetails",
      },
    },
    { $unwind: "$vendorDetails" },

    // Group items back under their subOrderId
    {
      $group: {
        _id: "$subOrders._id",
        status: { $first: "$subOrders.status" },
        totalAmount: { $first: "$subOrders.totalAmount" },
        totalItems: { $first: "$subOrders.totalItems" },
        shipmentRequestedAt: { $first: "$subOrders.shipmentRequestedAt" },
        shipmentAcceptedAt: { $first: "$subOrders.shipmentAcceptedAt" },
        vehicleType: { $first: "$subOrders.vehicleType" },
        orderId: { $first: "$_id" },
        customerId: { $first: "$customerId" },
        shippingDetails: { $first: "$shippingDetails" },
        createdAt: { $first: "$createdAt" },
        paymentStatus: { $first: "$paymentStatus" },
        vendor: {
          $first: {
            _id: "$vendorDetails._id",
            fullName: "$vendorDetails.fullName",
            nurseryName: "$vendorDetails.nurseryName",
            phoneNo: "$vendorDetails.phoneNo",
            email: "$vendorDetails.email",
            nurseryAddress: "$vendorDetails.address",
          },
        },
        items: { $push: "$subOrders.items" },
      },
    },

    // Rename _id to subOrderId
    {
      $project: {
        _id: 0,
        subOrderId: "$_id",
        status: 1,
        totalAmount: 1,
        totalItems: 1,
        shipmentRequestedAt: 1,
        shipmentAcceptedAt: 1,
        vehicleType: 1,
        orderId: 1,
        customerId: 1,
        shippingDetails: 1,
        createdAt: 1,
        paymentStatus: 1,
        vendor: 1,
        items: 1,
      },
    },
  ]);

  res.status(200).json({ status: "success", data: subOrders });
});

exports.acceptOrderShipmentRequest = asyncErrorHandler(
  async (req, res, next) => {
    const { status, vehicleType } = req.body;
    const { orderId, subOrderId } = req.params;
    // console.log(orderId, subOrderId, status, vehicleType);

    let order = await Order.findById(orderId);
    console.log(order);
    if (!order) return next(new customError("Order not found", 404));
    let subOrder = order.subOrders.find(
      (subOrder) => subOrder._id.toString() == subOrderId
    );
    console.log(subOrder);
    subOrder.status = "Shipped";
    subOrder.shipmentAcceptedAt = Date.now();
    subOrder.vehicleType = vehicleType;
    await order.save();

    console.log("Suborder", subOrder);

    res.status(200).json({
      status: "success",
      message: "Order shipment request accepted successfully.",
      data: subOrder,
    });
  }
);

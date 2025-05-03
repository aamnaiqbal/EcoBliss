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
// exports.getVendorOrders = asyncErrorHandler(async (req, res, next) => {
//   let { vendorId } = req.params;
//   console.log(vendorId);
//   vendorId = new mongoose.Types.ObjectId(vendorId);
//   // const orders = await Order.find({ "subOrders.vendorId": vendorId });

//   // const orders = await Order.aggregate([
//   //   {
//   //     $match: {
//   //       "subOrders.vendorId": vendorId,
//   //     },
//   //   },
//   //   {
//   //     $project: {
//   //       _id: 1,
//   //       customerId: 1,
//   //       createdAt: 1,
//   //       paymentMethod: 1,
//   //       paymentStatus: 1,
//   //       shippingCharges: 1,
//   //       shippingDetails: 1,
//   //       totalAmount: 1,
//   //       subOrders: {
//   //         $filter: {
//   //           input: "$subOrders",
//   //           as: "sub",
//   //           cond: { $eq: ["$$sub.vendorId", vendorId] },
//   //         },
//   //       },
//   //     },
//   //   },
//   // ]);

//   // const orders = await Order.aggregate([
//   //   {
//   //     $match: {
//   //       "subOrders.vendorId": vendorId, // vendorId as string
//   //     },
//   //   },
//   //   { $unwind: "$subOrders" },
//   //   { $match: { "subOrders.vendorId": vendorId } },
//   //   { $unwind: "$subOrders.items" },
//   //   {
//   //     $addFields: {
//   //       "subOrders.items.productId": {
//   //         $toObjectId: "$subOrders.items.productId",
//   //       },
//   //     },
//   //   },
//   //   {
//   //     $lookup: {
//   //       from: "plants",
//   //       localField: "subOrders.items.productId",
//   //       foreignField: "_id",
//   //       as: "productDetails",
//   //     },
//   //   },
//   //   {
//   //     $addFields: {
//   //       "subOrders.items.productDetails": {
//   //         $arrayElemAt: ["$productDetails", 0],
//   //       },
//   //     },
//   //   },
//   //   {
//   //     $group: {
//   //       _id: {
//   //         orderId: "$_id",
//   //         subOrderId: "$subOrders._id",
//   //       },
//   //       customerId: { $first: "$customerId" },
//   //       createdAt: { $first: "$createdAt" },
//   //       paymentMethod: { $first: "$paymentMethod" },
//   //       paymentStatus: { $first: "$paymentStatus" },
//   //       shippingCharges: { $first: "$shippingCharges" },
//   //       shippingDetails: { $first: "$shippingDetails" },
//   //       totalAmount: { $first: "$totalAmount" },
//   //       vendorId: { $first: "$subOrders.vendorId" },
//   //       status: { $first: "$subOrders.status" },
//   //       items: { $push: "$subOrders.items" },
//   //     },
//   //   },
//   //   {
//   //     $group: {
//   //       _id: "$_id.orderId",
//   //       customerId: { $first: "$customerId" },
//   //       createdAt: { $first: "$createdAt" },
//   //       paymentMethod: { $first: "$paymentMethod" },
//   //       paymentStatus: { $first: "$paymentStatus" },
//   //       shippingCharges: { $first: "$shippingCharges" },
//   //       shippingDetails: { $first: "$shippingDetails" },
//   //       totalAmount: { $first: "$totalAmount" },
//   //       subOrders: {
//   //         $push: {
//   //           _id: "$_id.subOrderId",
//   //           vendorId: "$vendorId",
//   //           status: "$status",
//   //           items: "$items",
//   //         },
//   //       },
//   //     },
//   //   },
//   //   {
//   //     $project: {
//   //       _id: 1,
//   //       customerId: 1,
//   //       createdAt: 1,
//   //       paymentMethod: 1,
//   //       paymentStatus: 1,
//   //       shippingCharges: 1,
//   //       shippingDetails: 1,
//   //       totalAmount: 1,
//   //       subOrders: 1,
//   //     },
//   //   },
//   // ]);

//   const orders = await Order.aggregate([
//     {
//       $match: {
//         "subOrders.vendorId": vendorId,
//       },
//     },
//     { $unwind: "$subOrders" },
//     {
//       $match: {
//         "subOrders.vendorId": vendorId,
//       },
//     },
//     { $unwind: "$subOrders.items" },
//     {
//       $addFields: {
//         "subOrders.items.productId": {
//           $toObjectId: "$subOrders.items.productId",
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "plants",
//         localField: "subOrders.items.productId",
//         foreignField: "_id",
//         as: "productDetails",
//       },
//     },
//     {
//       $addFields: {
//         "subOrders.items.productDetails": {
//           $arrayElemAt: ["$productDetails", 0],
//         },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           orderId: "$_id",
//           subOrderId: "$subOrders._id",
//         },
//         customerId: { $first: "$customerId" },
//         createdAt: { $first: "$createdAt" },
//         paymentMethod: { $first: "$paymentMethod" },
//         paymentStatus: { $first: "$paymentStatus" },
//         shippingCharges: { $first: "$shippingCharges" },
//         shippingDetails: { $first: "$shippingDetails" },
//         totalAmount: { $first: "$totalAmount" },
//         vendorId: { $first: "$subOrders.vendorId" },
//         status: { $first: "$subOrders.status" },
//         items: { $push: "$subOrders.items" },
//         subOrderTotalAmount: { $first: "$subOrders.totalAmount" },
//         subOrderTotalItems: { $first: "$subOrders.totalItems" },
//       },
//     },
//     {
//       $group: {
//         _id: "$_id.orderId",
//         customerId: { $first: "$customerId" },
//         createdAt: { $first: "$createdAt" },
//         paymentMethod: { $first: "$paymentMethod" },
//         paymentStatus: { $first: "$paymentStatus" },
//         shippingCharges: { $first: "$shippingCharges" },
//         shippingDetails: { $first: "$shippingDetails" },
//         totalAmount: { $first: "$totalAmount" },
//         subOrders: {
//           $push: {
//             _id: "$_id.subOrderId",
//             vendorId: "$vendorId",
//             status: "$status",
//             items: "$items",
//             totalAmount: "$subOrderTotalAmount",
//             totalItems: "$subOrderTotalItems",
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 1,
//         customerId: 1,
//         createdAt: 1,
//         paymentMethod: 1,
//         paymentStatus: 1,
//         shippingCharges: 1,
//         shippingDetails: 1,
//         totalAmount: 1,
//         subOrders: 1,
//       },
//     },
//   ]);

//   orders.forEach((order) => {
//     order.createdAtFormatted = moment(order.createdAt).format(
//       "ddd, MMMM D, YYYY"
//     );
//   });

//   console.log(orders);

//   res.status(200).json({
//     status: "success",
//     data: orders,
//   });
// });

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
  if (!order) return next(new customError("Order not found", 404));
  console.log(order);

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
  await order.save();

  res.status(200).json({
    status: "success",
    message: "Order status updated",
    data: vendorOrder,
  });
});

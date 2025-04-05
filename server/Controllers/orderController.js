const Order = require("../Models/orderModel");
const Cart = require("../Models/cartModel");
const Plant = require("../Models/plantModel");
const PlantCare = require("../Models/plantCareModel");

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

  for (const item of cart.items) {
    const vendorId = item.vendorId.toString();

    // If vendor does not exist in orders, create a new entry
    if (!vendorOrders[vendorId]) {
      vendorOrders[vendorId] = {
        _id: new mongoose.Types.ObjectId(), // Generate unique ID for sub-order
        vendorId,
        items: [],
        totalAmount: 0,
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

const Order= require("../Models/orderModel");
const Cart = require("../Models/cartModel");

const mongoose= require('mongoose');
const asyncErrorHandler= require('../utils/asyncErrorHandler')


exports.placeOrder= asyncErrorHandler(async(req, res, next)=>{
    const order= await Order.create(req.body);
    const cart= await Cart.findOneAndDelete({customerId: req.body.customerId})
    console.log(cart)
    res.json({
        status: "success",
        data: order
    })
})

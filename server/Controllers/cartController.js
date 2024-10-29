const Cart = require("../Models/cartModel");
const PlantCare= require('../Models/plantCareModel');
const Plant= require('../Models/plantModel');
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");

exports.addItemToCart = asyncErrorHandler(async (req, res) => {
  console.log(req.body)
  const { customerId, productId, productType, quantity, size } = req.body;
  let cart = await Cart.findOne({ customerId });

  if (!cart) {
    cart = new Cart({
      customerId,
      items: [{ productId, productType, quantity, size }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.equals(productId) && item.size === size
    );
    
    if (itemIndex > -1) {

      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, productType, quantity, size });
    }
  }

  await cart.save();
  
  res.status(201).json({ status: "success", cart });
});

exports.getCart = asyncErrorHandler(async (req, res, next) => {

  let cart = await Cart.findOne({customerId: req.params.id});

  if (!cart) {
    return next(new customError("Cart not found", 404));
  }

  // Populate items based on productType
  await Promise.all(cart.items.map(async (item) => {
    if (item.productType === 'Plant') {
        const plant = await Plant.findById(item.productId).select('name image size ');
        item.productId = plant; // Set the populated plant
    } else if (item.productType === 'PlantCare') {
        const plantCare = await PlantCare.findById(item.productId).select('name price image ');
        item.productId = plantCare; // Set the populated plant care
    }
}));
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.updateQuantity=asyncErrorHandler(async(req,res,next)=>{
  const {customerId, productId}=req.params;
  const {quantity, size}= req.body;
  const cart= await Cart.findOne({customerId});
  if(!cart) return next(new customError("Cart not found", 404));
  let product;
  if(size){
    product= cart.items.find((item)=>item.productId.toString()===productId && item.size===size);
  }else{
    product= cart.items.find((item)=>item.productId.toString()===productId);
  }
  if(!product) return next(new customError("Product not found in cart.", 404));
  product.quantity= quantity;
  await cart.save()
  res.status(200).json({
    status: 'success',
    data:{
      cart
    }
  })
})

exports.deleteProduct= asyncErrorHandler(async(req,res,next)=>{
  const {customerId, productId, size}=req.params;
  // const {size}= req.b
  console.log(size);
  const cart= await Cart.findOne({customerId})
  if(!cart) return next(new customError("Cart not found", 404));
  let productIndex;
  if(size){
    productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size===size
    );
  }else{
    productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
  }
  if (productIndex === -1) return next(new customError("Product not found in cart.", 404));
  cart.items.splice(productIndex, 1);
  await cart.save();
  res.status(204).json({
    success: true,
    data: null,
  });
})
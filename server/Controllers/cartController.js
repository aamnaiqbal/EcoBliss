const Cart = require("../Models/cartModel");
const PlantCare = require("../Models/plantCareModel");
const Plant = require("../Models/plantModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");

exports.addItemToCart = asyncErrorHandler(async (req, res) => {
  const { customerId, productId, productType, quantity, size } = req.body;
  // console.log(req.body);
  let updatedQuantity = quantity;
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
      updatedQuantity = cart.items[itemIndex].quantity;
    } else {
      cart.items.push({ productId, productType, quantity, size });
    }
  }

  await cart.save();
  // Fetch the newly added/updated item with full details
  let newItem;
  if (productType === "Plant") {
    const plant = await Plant.findById(productId).select("name image size");
    newItem = {
      productId: {
        _id: plant._id,
        name: plant.name,
        image: plant.image,
        size: plant.size, // Get the correct price for the selected size
      },
      productType,
      quantity: updatedQuantity,
      size,
    };
  } else if (productType === "PlantCare") {
    const plantCare = await PlantCare.findById(productId).select(
      "name image price"
    );
    newItem = {
      productId: {
        _id: plantCare._id,
        name: plantCare.name,
        image: plantCare.image,
        price: plantCare.price,
      },
      productType,
      quantity: updatedQuantity,
    };
  }

  res.status(201).json({
    status: "success",
    cartItem: newItem,
  });
});

exports.getCart = asyncErrorHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ customerId: req.params.id });

  if (!cart) {
    return next(new customError("Cart not found", 404));
  }

  // Populate items based on productType
  await Promise.all(
    cart.items.map(async (item) => {
      if (item.productType === "Plant") {
        const plant = await Plant.findById(item.productId).select(
          "name image size "
        );
        item.productId = plant; // Set the populated plant
      } else if (item.productType === "PlantCare") {
        const plantCare = await PlantCare.findById(item.productId).select(
          "name price image "
        );
        item.productId = plantCare; // Set the populated plant care
      }
    })
  );
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.updateQuantity = asyncErrorHandler(async (req, res, next) => {
  const { customerId, productId } = req.params;
  const { quantity, size } = req.body;
  const cart = await Cart.findOne({ customerId });
  if (!cart) return next(new customError("Cart not found", 404));
  let product;
  if (size) {
    product = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );
  } else {
    product = cart.items.find(
      (item) => item.productId.toString() === productId
    );
  }
  if (!product) return next(new customError("Product not found in cart.", 404));
  product.quantity = quantity;
  await cart.save();
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const { customerId, cartItemId } = req.params;
  const cart = await Cart.findOne({ customerId });
  if (!cart) return next(new customError("Cart not found", 404));
  const productIndex = cart.items.findIndex(
    (item) => item._id.toString() === cartItemId
  );
  if (productIndex === -1)
    return next(new customError("Item not found in cart.", 404));
  cart.items.splice(productIndex, 1);
  await cart.save();
  res.status(204).json({
    success: true,
    data: null,
  });
});

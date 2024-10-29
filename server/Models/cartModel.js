const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'productType'  // To reference either Plant or PlantCare model
    },
    productType: {
        type: String,
        required: true,
        enum: ['Plant', 'PlantCare']
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']  // Optional, relevant only for Plant items with size
    },
});

const cartSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

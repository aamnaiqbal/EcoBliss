const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  subOrders: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "Vendor Id is required."],
      },
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "items.modelType",
            required: true,
          },
          modelType: {
            type: String,
            enum: ["Plant", "PlantCare"],
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          size: {
            type: String,
            required: function () {
              return this.modelType === "Plant";
            },
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      status: {
        type: String,
        enum: ["Pending", "Ready to ship", "Shipped", "Delivered"],
        default: "Pending",
      },
      totalAmount: { type: Number, required: true },
      shipmentRequestedAt: {
        type: Date,
      },
      shipmentAcceptedAt: {
        type: Date,
      },
      vehicleType: {
        type: String,
        enum: ["Delivery Bike", "Suzuki", "Truck"],
      },
    },
  ],
  shippingCharges: {
    type: Number,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash on Delivery", "Card"],
  },
  shippingDetails: {
    fullName: {
      type: String,
      required: [true, "Name is required field."],
    },
    address: {
      type: String,
      required: [true, "Address is required field."],
    },
    phoneNo: {
      type: String,
      required: [true, "Phone Number is required field."],
    },
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

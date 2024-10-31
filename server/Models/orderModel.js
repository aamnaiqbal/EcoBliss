const mongoose= require('mongoose');

const orderSchema= new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'items.modelType',
                required: true
            },
            modelType:{
                type: String,
                enum: ['Plant', 'PlantCare'],
                required: true
            },
            name: String,
            quantity:{
                type: Number,
                required: true
            },
            size:{
                type: String,
                required: function(){
                    return this.modelType==='Plant';
                }
            },
            price: Number
        }
    ],
    shippingCharges:{
        type: Numer
    },
    totalAmount:{
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash on Delivery', 'Card']
    },
    shippingDetails:{
        fullName: {
            type: String,
            required: [true, "Name is required field."]
        },
        address: {
            type: String,
            required: [true, "Address is required field."]
        },
        phoneNo: {
            type: String,
            required: [true, "Phone Number is required field."]
        },
    },
    status: {
        type: String,
        defaul: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Order= mongoose.model('Order', orderSchema);
module.exports= Order;
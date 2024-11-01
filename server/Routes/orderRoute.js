const orderController = require('../Controllers/orderController')
const express= require('express');

const router=express.Router();
router.route('/').post(orderController.placeOrder);
module.exports= router;
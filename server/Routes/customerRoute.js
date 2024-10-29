const express= require('express');
const customerController= require('../Controllers/customerController')

const router = express.Router();

router.route('/login').post(customerController.login)
router.route('/signup').post(customerController.signup)

module.exports= router
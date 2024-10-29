const express= require('express')
const cartController= require('../Controllers/cartController');
const router= express.Router();

router.route('/add').post(cartController.addItemToCart);
router.route('/:id').get(cartController.getCart);
router.route('/:customerId/:productId').patch(cartController.updateQuantity).delete(cartController.deleteProduct)
router.route('/:customerId/:productId/:size').delete(cartController.deleteProduct)
router.route('/:customerId/:productId').delete(cartController.deleteProduct)


module.exports= router;
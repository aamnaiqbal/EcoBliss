const express= require('express')
const plantCareController= require('../Controllers/plantCareController');
const router= express.Router();

router.route('/').get(plantCareController.getAllPlantCareProducts).post(plantCareController.addPlantCareProduct);
router.route('/:id').get(plantCareController.getPlantCareProduct);

module.exports= router;
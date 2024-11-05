const express= require('express');
const plantController= require('../Controllers/plantController')
const router=express.Router();

router.route('/').get(plantController.getAllPlants).post(plantController.addPlant);
router.route('/popular').get(plantController.getPopularPlants);
router.route('/:id').get(plantController.getPlant);

module.exports= router
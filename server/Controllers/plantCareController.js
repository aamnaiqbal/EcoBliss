const PlantCare= require('../Models/plantCareModel');
const asyncErrorHandler= require('../utils/asyncErrorHandler');
const customError= require('../utils/customError')

exports.getAllPlantCareProducts=asyncErrorHandler(async(req,res,next)=>{
    const products=await PlantCare.find().select('name price category image subImg');
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    })
});

exports.addPlantCareProduct= asyncErrorHandler(async(req,res,next)=>{
    const product= await PlantCare.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            product
        }
    })
});

exports.getPlantCareProduct= asyncErrorHandler(async(req,res,next)=>{
    const product= await PlantCare.findById(req.params.id);
    if(!product){
        return next(new customError("Plant-care product not found", 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })

})

exports.getPopularPlantCareProducts= asyncErrorHandler(async(req,res,next)=>{
    const popularProducts= await PlantCare.find({popular: true}) 
    if(!popularProducts){
        return next(new customError("No popular plant-care products found", 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            popularProducts
        }
    })
})
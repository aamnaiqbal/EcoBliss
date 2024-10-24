const Plant= require('../Models/plantModel');
const asyncErrorHandler= require('../utils/asyncErrorHandler');
const customError= require('../utils/customError')

exports.getAllPlants=asyncErrorHandler(async(req,res,next)=>{
    const plants=await Plant.find().select('name size category image subImg');
    res.status(200).json({
        status: 'success',
        data: {
            plants
        }
    })
});

exports.addPlant= asyncErrorHandler(async(req,res,next)=>{
    const plant= await Plant.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            plant
        }
    })
});

exports.getPlant= asyncErrorHandler(async(req,res,next)=>{
    const plant= await Plant.findById(req.params.id);
    if(!plant){
        return next(new customError("Plant details not found", 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            plant
        }
    })

})

exports.getPopularPlants= asyncErrorHandler(async(req,res,next)=>{
    const popularPlants= await Plant.find({popular: true}) 
    if(!popularPlants){
        return next(new customError("No popular plants not found", 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            popularPlants
        }
    })
})

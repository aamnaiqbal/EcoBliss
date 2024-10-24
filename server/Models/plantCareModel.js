const mongoose = require("mongoose");
const validator=require('validator')
const plantCareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field."],
    trim: true,
  },
  price:{
    type: Number,
    required: [true, 'Price is required field.']
    
  },
  image: {
    type: String,
    required: [true, "Please enter the image of the plant"],
  },
  subImg: {
    subImg1: {
      type: String,
    },
    subImg2: {
      type: String,
    },
    subImg3: {
      type: String,
    },
  },
  description: {
    type: String,
    required: [true, "Please enter the description of the plant"],
  },
  popular: {
    type: Boolean,
    default: false
  },
});

const PlantCare=mongoose.model('PlantCare', plantCareSchema);
module.exports= PlantCare;

const mongoose = require("mongoose");
const validator=require('validator')
const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field."],
    trim: true,
  },
  size:{
    S:{
        type: Number,
    },
    M:{
        type: Number,
    },
    L:{
        type: Number,
    }
  },
  category: {
    type: String,
    enum: ["Outdoor", "Orchid", "HousePlants", "Gifts"],
    required: [true, "Please enter the category of the plant that it belongs."],
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

const Plant=mongoose.model('Plant', plantSchema);
module.exports= Plant;
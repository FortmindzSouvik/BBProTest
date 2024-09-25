const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const foodSchema = mongoose.Schema(
  {
    mealNumber: {
      type: Number,
      default:0
    },
    mealName:{
        type: String,
      default:""
    },
    noOfServing: {
        type: Number,
        default:0
      },
      time:{
        type: Date
    },
    carbohydrate:{
        type: String,
      default:""
    },
    protin:{
        type: String,
      default:""
    },
    fat:{
        type: String,
      default:""
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true, ref:'User' },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
foodSchema.plugin(toJSON);
foodSchema.plugin(paginate);


const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

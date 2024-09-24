const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');
const goalSchema = mongoose.Schema(
  {
    weight: {
        type: String,
      default:"" 
    },
    dailyCalories:{
      type: String,
      default:""
    },
    user_id:{
       type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
goalSchema.plugin(toJSON);
goalSchema.plugin(paginate);


const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;

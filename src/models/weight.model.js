const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const weightSchema = mongoose.Schema(
  {
    weight: {
      type: String,
      default:""
    },
    time:{
        type: Date
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true, default: null,ref:'User' },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
weightSchema.plugin(toJSON);
weightSchema.plugin(paginate);


const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;

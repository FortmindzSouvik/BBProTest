const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');
const cycleSchema = mongoose.Schema(
  {
    substanceId: {
        type: mongoose.Schema.Types.ObjectId, required: true, default: null,ref:'Substance' 
    },
    dosage:{
      type: String,
      default:""
    },
    time:{
        type:Number,
        default: 0
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cycleSchema.plugin(toJSON);
cycleSchema.plugin(paginate);


const Cycle = mongoose.model('Cycle', cycleSchema);
module.exports = Cycle;

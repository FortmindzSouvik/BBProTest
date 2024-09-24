const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');
const substanceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default:""
    },
    dosage:{
      type: String,
      default:""
    },
    serving:{
        type:Number,
        default: 0
    },
    halfLife:{
       type: String,
      default:""
    },
    frequency:{
        type:Number,
        default: 0
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true, default: null,ref:'User' },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
substanceSchema.plugin(toJSON);
substanceSchema.plugin(paginate);


const Substance = mongoose.model('Substance', substanceSchema);
module.exports = Substance;

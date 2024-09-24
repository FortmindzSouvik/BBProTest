const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const stepSchema = mongoose.Schema(
  {
    step: {
      type: Number,
      default:0
    },
    startTime:{
        type: Date
    },
    endTime:{
        type: Date
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true,ref:'User' },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
stepSchema.plugin(toJSON);
stepSchema.plugin(paginate);


const Step = mongoose.model('Step', stepSchema);

module.exports = Step;

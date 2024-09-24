const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const sleepSchema = mongoose.Schema(
  {
    wentToBed: {
      type: Date
    },
    wokeUp:{
        type: Date
    },
    qualityOfSleep:{
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
sleepSchema.plugin(toJSON);
sleepSchema.plugin(paginate);


const Sleep = mongoose.model('Sleep', sleepSchema);
module.exports = Sleep;

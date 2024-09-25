const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const workOutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default:""
    },
    numberOfSet: {
        type: Number,
        default:""
      },
    reps: {
        type: String,
        default:""
      },
    weight: {
        type: String,
        default:""
      },
    energyExpended: {
        type: String,
        default:""
      },
    avgHeartBeat: {
        type: String,
        default:""
      },
    type: {
        type: String,
        enum: ['weightLifting',"cardioVascular"],
        default:"weightLifting"
      },
    startTime:{
        type: Date
    },
    endTime:{
        type: Date
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true, ref:'User' },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
workOutSchema.plugin(toJSON);
workOutSchema.plugin(paginate);


const WorkOut = mongoose.model('WorkOut', workOutSchema);
module.exports = WorkOut;

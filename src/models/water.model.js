const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const waterSchema = mongoose.Schema(
  {
    totalVolume: {
      type: String,
      default:""
    },
      time:{
        type: Date
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true,ref:'User' },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
waterSchema.plugin(toJSON);
waterSchema.plugin(paginate);


const Water = mongoose.model('Water', waterSchema);

module.exports = Water;

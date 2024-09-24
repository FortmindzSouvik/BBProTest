const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');
const connectionSchema = mongoose.Schema(
  {
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true,ref:'User' },
    coach_id:{type: mongoose.Schema.Types.ObjectId, required: true,ref:'User' },
    acceptanceStatus:{
        type:Boolean,
        default: false
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
connectionSchema.plugin(toJSON);
connectionSchema.plugin(paginate);


const Connection = mongoose.model('Connection', connectionSchema);
module.exports = Connection;

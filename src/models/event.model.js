const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const attendees = new mongoose.Schema({
    email: { type: String },
    responseStatus: {type: String, default: ""},
  });
const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      default:""
    },
    description:{
        type: String,
      default:""
    },
    attendees:[attendees],
    date:{
        type: Date
    }
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);


const User = mongoose.model('Event', eventSchema);

module.exports = User;

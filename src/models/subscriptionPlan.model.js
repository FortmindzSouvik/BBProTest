const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');
const subscriptionPlanSchema = mongoose.Schema(
  {
    name: {
       type: String, required: false, default: ""
    },
    amount:{
    type: Number, required: false, default: 0
    },
    duration:{
        type: String,
        default:""
      }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
subscriptionPlanSchema.plugin(toJSON);
subscriptionPlanSchema.plugin(paginate);


const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
module.exports = SubscriptionPlan;

const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string, date } = require('joi');
const subscriptionSchema = mongoose.Schema(
  {
    user_id: {
       type: mongoose.Schema.Types.ObjectId, required: true, default: null,ref:'User'
    },
    planId:{
    type: mongoose.Schema.Types.ObjectId, required: true, default: null,ref:'SubscriptionPlan'
    },
    subscriptionId:{
        type: String,
        default:""
      },
      validTill:{
        type: Date
      },
      stripeCustomerId:{
        type: String,
        default:""
      }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
subscriptionSchema.plugin(toJSON);
subscriptionSchema.plugin(paginate);


const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;

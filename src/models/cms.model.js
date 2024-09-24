const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');
const cmsSchema = mongoose.Schema(
  {
    privacyCenter: {
        type: String,
      default:"" 
    },
    aboutUs:{
      type: String,
      default:""
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cmsSchema.plugin(toJSON);
cmsSchema.plugin(paginate);


const Cms = mongoose.model('Cms', cmsSchema);
module.exports = Cms;

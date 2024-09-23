const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');
const reviewSchema = mongoose.Schema(
  {
    reviewTo: {
       type: mongoose.Schema.Types.ObjectId, required: true, default: null,ref:'User'
    },
    reviewBy:{
     type: mongoose.Schema.Types.ObjectId, required: true, default: null,ref:'User'
    },
    reviewText:{
        type: String,
        default:""
      },
      rating:{
        type:String,
        default:"0"
      }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");
const { string } = require("joi");
const cycleSchema = mongoose.Schema(
  {
    substanceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: null,
      ref: "Substance",
    },
    dosage: {
      type: Number,
      default: 0,
    },
    time: {
      type: Date,
    },
    serving: {
      type: String,
      enum: ['one_week', 'two_weeks', 'three_weeks', 'one_month'],
      default: 'one_week',
    },
    frequency: {
      type: String,
      enum: [
        'one_hour',
        'three_hours',
        'six_hours',
        'twelve_hours',
        'one_day',
        'two_days',
        'three_days',
        'one_week',
        'two_weeks',
        'three_weeks',
        'one_month',
      ],
      default: 'one_hour',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: null,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cycleSchema.plugin(toJSON);
cycleSchema.plugin(paginate);

const Cycle = mongoose.model("Cycle", cycleSchema);
module.exports = Cycle;

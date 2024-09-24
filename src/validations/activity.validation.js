const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const addMeal = {
  body: Joi.object().keys({
    mealNumber: Joi.number().required(),
    mealName: Joi.string().required(),
    noOfServing: Joi.number().required(),
    time:Joi.string().required(),
    carbohydrate:Joi.string().required(),
    protin:Joi.string().required(),
    fat: Joi.string().required()
  }),
};
const getData = {
  query: Joi.object().keys({
    id: Joi.string().required(),
  })
}
const getProgressData = {
  query: Joi.object().keys({
    date: Joi.string().required(),
  })
}
const addWater = {
  body: Joi.object().keys({
    totalVolume: Joi.string().required(),
    time: Joi.string().required(),
  }),
};
const addStep = {
  body: Joi.object().keys({
    step: Joi.number().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  }),
};
const addWorkout = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    numberOfSet: Joi.number().allow('').optional(),
    reps:Joi.string().allow('').optional(),
    weight:Joi.string().allow('').optional(),
    energyExpended:Joi.string().allow('').optional(),
    avgHeartBeat:Joi.string().allow('').optional(),
    type:Joi.string().required().valid('weightLifting', 'cardioVascular'),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  }),
};
const addWeight = {
  body: Joi.object().keys({
    weight: Joi.string().required(),
    time: Joi.string().required()
  }),
};
const addSleep = {
  body: Joi.object().keys({
    wentToBed: Joi.string().required(),
    wokeUp: Joi.string().required(),
    qualityOfSleep:Joi.number().required()
  }),
};

const addSubstance = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    halfLife: Joi.number().required()
  }),
};
const addCycle = {
  body: Joi.object().keys({
    substanceId: Joi.string().required(),
    dosage: Joi.number().required(),
    time: Joi.string().required(),
    serving: Joi.string().required().valid('one_week', 'two_weeks', 'three_weeks', 'one_month'),
    frequency: Joi.string().required().valid('one_hour',
        'three_hours',
        'six_hours',
        'twelve_hours',
        'one_day',
        'two_days',
        'three_days',
        'one_week',
        'two_weeks',
        'three_weeks',
        'one_month',)
  }),
};
module.exports = {
    addMeal,
    addWater,
    addStep,
    addWorkout,
    addWeight,
    addSleep,
    getData,
    getProgressData,
    addSubstance,
    addCycle
};

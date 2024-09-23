const httpStatus = require('http-status');
const { Food,Water,Step,WorkOut,Weight,Sleep } = require('../models');
const ApiError = require('../utils/ApiError');

const addMeal =async (data) => {
    const meal = await new Food(data).save();
    if (!meal) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add meal');
    }
   
    return meal;
  };
  const addWater =async (data) => {
    const water = await new Water(data).save();
    if (!water) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add water');
    }
   
    return water;
  };
  const getMealByUserId = async (data,page,limit,skip) => {
    const meal = await Food.find(data).skip(skip)  // Skip meals based on the current page
    .limit(limit) // Limit the number of meals to return
    .exec();
    if (!meal) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get meal');
    }
   
    return meal;
  };
  const getCountByUserId = async (schema,data) => {
     // Ensure schema is valid
  if (!schema || typeof schema.countDocuments !== 'function') {
    throw new Error('Invalid schema provided');
  }
    const meal = await schema.countDocuments(data)
    if (meal===0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get meal');
    }
   
    return meal;
  };
  const getById= async (schema,data) => {
    // Ensure schema is valid
 if (!schema || typeof schema.countDocuments !== 'function') {
   throw new Error('Invalid schema provided');
 }
   const activityData = await schema.findOne(data)
   if (!activityData===0) {
     throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get activity data');
   }
  
   return activityData;
 };
  const getWaterByUserId = async (data,page,limit,skip) => {
    const water = await Water.find(data).skip(skip)  // Skip meals based on the current page
    .limit(limit) // Limit the number of meals to return
    .exec();
    if (!water) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get water');
    }
   
    return water;
  };
  const addStep =async (data) => {
    const step = await new Step(data).save();
    if (!step) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add step');
    }
   
    return step;
  };
  const getStepByUserId = async (data,page,limit,skip) => {
    const step = await Step.find(data).skip(skip)  // Skip meals based on the current page
    .limit(limit) // Limit the number of meals to return
    .exec();
    if (!step) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get step');
    }
   
    return step;
  };
  const addWorkOut =async (data) => {
    const workOut = await new WorkOut(data).save();
    if (!workOut) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add workout');
    }
   
    return workOut;
  };
  const getWorkOutByUserId = async (data,page,limit,skip) => {
    const workout = await WorkOut.find(data).skip(skip)  // Skip meals based on the current page
    .limit(limit) // Limit the number of meals to return
    .exec();
    if (!workout) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get workout');
    }
   
    return workout;
  };
  const addWeight=async (data) => {
    const weight = await new Weight(data).save();
    if (!weight) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add weight');
    }
   
    return weight;
  };
  const getWeightByUserId = async (data,page,limit,skip) => {
    const weight = await Weight.find(data).sort({ time: -1 }).skip(skip)  // Skip meals based on the current page
    .limit(limit) // Limit the number of meals to return
    .exec();
    if (!weight) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get weight');
    }
   
    return weight;
  };
  const addSleep=async (data) => {
    const sleep = await new Sleep(data).save();
    if (!sleep) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add sleep');
    }
   
    return sleep;
  };
  const getSleepByUserId = async (data,page,limit,skip) => {
    const sleep = await Sleep.find(data).skip(skip)  // Skip meals based on the current page
    .limit(limit) // Limit the number of meals to return
    .exec();
    if (!sleep) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get sleep');
    }
   
    return sleep;
  };
module.exports = {
    addMeal,
    getMealByUserId,
    addWater,
    getWaterByUserId,
    addStep,
    getStepByUserId,
    addWorkOut,
    getWorkOutByUserId,
    addWeight,
    getWeightByUserId,
    addSleep,
    getSleepByUserId,
    getCountByUserId,
    getById
}
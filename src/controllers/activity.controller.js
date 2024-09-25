const catchAsync = require('../utils/catchAsync');
const ApiSuccess = require('../utils/ApiSuccess');
const ApiError = require('../utils/ApiError');
const respMessage = require('../response.json');
const httpStatus = require('http-status');
const { activityService } = require('../services');
const currentDate = new Date();
const moment = require('moment');
const { Food, Water, Step, WorkOut, Weight, Sleep,Substance, Goal } = require('../models');

// Helper function to check if a date is today
const isToday = (date) => {
  const activity = new Date(date);
  const today = new Date();
  return (
    activity.getDate() === today.getDate() &&
    activity.getMonth() === today.getMonth() &&
    activity.getFullYear() === today.getFullYear()
  );
};

// Helper function to check if a date is in the current week
const isThisWeek = (date) => {
  const activity = new Date(date);
  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Sunday
  const endOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)); // Saturday
  return activity >= startOfWeek && activity <= endOfWeek;
};

// Helper function to check if a date is in the current month
const isThisMonth = (date) => {
  const activity = new Date(date);
  return activity.getMonth() === currentDate.getMonth() && activity.getFullYear() === currentDate.getFullYear();
};
const addMeal = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const addMeal = await activityService.addMeal(inputData);
  if (addMeal) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.MEAL_ADD,addMeal);
   
  } else {
  throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});
const getMealList = catchAsync(async (req, res) => {
  // Pagination variables (with defaults)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
  const getMeal = await activityService.getMealByUserId({ user_id: req.user._id }, page, limit, skip);

  if (getMeal) {
    // Get the current date
    // Get total count of meals for pagination meta information
    const totalMeals = await activityService.getCountByUserId(Food, { user_id: req.user._id });

    // Calculate total pages
    const totalPages = Math.ceil(totalMeals / limit);

    // Filtering activitys
    const dailyMeals = getMeal.filter((meal) => isToday(meal.time));
    const weeklyMeals = getMeal.filter((meal) => isThisWeek(meal.time));
    const monthlyMeals = getMeal.filter((meal) => isThisMonth(meal.time));

    // Return filtered data
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{dailyMeals,
      weeklyMeals,
      monthlyMeals},"",totalPages,page);
  } else {
  throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});
const getMealById = catchAsync(async(req,res)=>{
    const data = await activityService.getById(Food,{_id:req.query.id})
    if(data){
  new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,data);
      
    }else{
  throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

    }
})

const addWater = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const addWater = await activityService.addWater(inputData);
  if (addWater) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.WATER_ADD,addWater);
  } else {
  throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const getWaterList = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
  const getWater = await activityService.getWaterByUserId({ user_id: req.user._id }, page, limit, skip);
  if (getWater) {
    const totalCount = await activityService.getCountByUserId(Water, { user_id: req.user._id });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    // Filtering activitys
    const dailyWater = getWater.filter((water) => isToday(water.time));
    const weeklyWater = getWater.filter((water) => isThisWeek(water.time));
    const monthlyWater = getWater.filter((water) => isThisMonth(water.time));
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{
      dailyWater,
      weeklyWater,
      monthlyWater,
    },"",totalPages,page);
  } else {
  throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const getWaterById = catchAsync(async(req,res)=>{
    const data = await activityService.getById(Water,{_id:req.query.id})
    if(data){
      new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,data);
    }else{
          throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
    }
})
const getStepById = catchAsync(async(req,res)=>{
    const data = await activityService.getById(Step,{_id:req.query.id})
    if(data){
      new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,data);
    }else{
          throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

    }
})
const getWorkoutById = catchAsync(async(req,res)=>{
    const data = await activityService.getById(WorkOut,{_id:req.query.id})
    if(data){
      new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,data);
    }else{
          throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
    }
})
const getWeightById= catchAsync(async(req,res)=>{
    const data = await activityService.getById(Weight,{_id:req.query.id})
    if(data){
      new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,data);
    }else{
          throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
    }
})
const getSleepById= catchAsync(async(req,res)=>{
    const data = await activityService.getById(Sleep,{_id:req.query.id})
    if(data){
      new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,data);
    }else{
          throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
    }
})
const addStep = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const addStep = await activityService.addStep(inputData);
  if (addStep) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.STEP_ADD,addStep);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});

const getStepList = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
  const getStep = await activityService.getStepByUserId({ user_id: req.user._id }, page, limit, skip);
  if (getStep) {
    // Filtering activitys
    const dailyStep = getStep.filter((step) => isToday(step.startTime));
    const weeklyStep = getStep.filter((step) => isThisWeek(step.startTime));
    const monthlyStep = getStep.filter((step) => isThisMonth(step.startTime));
    const totalCount = await activityService.getCountByUserId(Step, { user_id: req.user._id });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{
      dailyStep,
        weeklyStep,
        monthlyStep,
    },"",totalPages,page);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});
const addWorkOut = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const addWorkOut = await activityService.addWorkOut(inputData);
  if (addWorkOut) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.WORKOUT_ADD,addWorkOut);

  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const getWorkOut = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
  const workout = await activityService.getWorkOutByUserId({ user_id: req.user._id }, page, limit, skip);
  if (workout) {
    const dailyWorkOut = workout.filter((workout) => isToday(workout.startTime));
    const weeklyWorkOut = workout.filter((workout) => isThisWeek(workout.startTime));
    const monthlyWorkOut = workout.filter((workout) => isThisMonth(workout.startTime));
    const totalCount = await activityService.getCountByUserId(WorkOut, { user_id: req.user._id });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{
      dailyWorkOut,
      weeklyWorkOut,
      monthlyWorkOut,
    },"",totalPages,page);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const addWeight = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const addWeight = await activityService.addWeight(inputData);
  if (addWeight) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.WEIGHT_ADD,addWeight);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});
const getWeight = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
  const weight = await activityService.getWeightByUserId({ user_id: req.user._id }, page, limit, skip);
  if (weight) {
    const dailyWeight = weight.filter((weight) => isToday(weight.time));
    const weeklyWeight = weight.filter((weight) => isThisWeek(weight.time));
    const monthlyWeight = weight.filter((weight) => isThisMonth(weight.time));
    const totalCount = await activityService.getCountByUserId(Weight, { user_id: req.user._id });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{
      dailyWeight,
        weeklyWeight,
        monthlyWeight,
    },"",totalPages,page);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const addSleep = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const sleep = await activityService.addSleep(inputData);
  if (sleep) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SLEEP_ADD,sleep);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});
const getSleep = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
  const sleep = await activityService.getSleepByUserId({ user_id: req.user._id }, page, limit, skip);
  if (sleep) {
    const dailySleep = sleep.filter((sleep) => isToday(sleep.wentToBed));
    const weeklySleep = sleep.filter((sleep) => isThisWeek(sleep.wentToBed));
    const monthlySleep = sleep.filter((sleep) => isThisMonth(sleep.wentToBed));
    const totalCount = await activityService.getCountByUserId(Sleep, { user_id: req.user._id });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{
      dailySleep,
      weeklySleep,
      monthlySleep,
    },"",totalPages,page);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});
const getProcessData = catchAsync(async (req, res) => {
  // Convert the inputDate to start and end times for the query
  const formattedDate = moment(req.query.date, 'DD-MM-YYYY').toDate();

  if (!moment(formattedDate).isValid()) {
    throw new Error('Invalid date format');
  }
  const startDate = moment(formattedDate).startOf('day').toDate();
  const endDate = moment(formattedDate).endOf('day').toDate();

  // Query to find all meals for the user on the specific date
  // const meals = await Food.find({
  //   user_id: mongoose.Types.ObjectId(userId),
  //   time: { $gte: startDate, $lte: endDate }, // Date range for the entire day
  // });\


  /////for meals part

  const meals = await activityService.getMealByUserId({ user_id: req.user._id ,time: { $gte: startDate, $lte: endDate }} );

  // Initialize total calories
  let totalCalories = 0;

  // Calculate total calories from all meals
  meals.forEach((meal) => {
    const carbohydrate = parseFloat(meal.carbohydrate) || 0;
    const protein = parseFloat(meal.protin) || 0;
    const fat = parseFloat(meal.fat) || 0;

    // Calculate calories for the meal
    const caloriesForMeal =
      carbohydrate * 4 + // 4 calories per gram of carbohydrate
      protein * 4 +      // 4 calories per gram of protein
      fat * 9;           // 9 calories per gram of fat

    // Add to the total calories
    totalCalories += caloriesForMeal;
  });

  /////steps count
  const steps = await activityService.getStepByUserId({ user_id: req.user._id ,startTime: { $gte: startDate, $lte: endDate }} );

  // Initialize total steps
  let totalSteps = 0;

  // Sum the steps for the selected records
  steps.forEach((record) => {
    totalSteps += record.step || 0; // Ensure step is a number, or default to 0
  });
   

  /////water count
  const water = await activityService.getWaterByUserId({ user_id: req.user._id ,time: { $gte: startDate, $lte: endDate }} );
  // Initialize total steps
  let totalWater = 0;
  // Sum the steps for the selected records
  water.forEach((record) => {
    totalWater +=Number(record.totalVolume) || 0; // Ensure step is a number, or default to 0
  });

/////workout count
const workOut = await activityService.getWorkOutByUserId({ user_id: req.user._id ,startTime: { $gte: startDate, $lte: endDate }} );
  let totalDurationMinutes = 0;

  // Calculate the duration of each workout session
  workOut.forEach((workout) => {
    const startTime = new Date(workout.startTime);
    const endTime = new Date(workout.endTime);

    // Calculate the duration for this workout session (in minutes)
    const durationMs = endTime - startTime;
    const durationMinutes = durationMs / (1000 * 60); // Convert milliseconds to minutes
    totalDurationMinutes += durationMinutes;
  });


////////weight latest
const weight = await activityService.getWeightByUserId({ user_id: req.user._id });
let latestWeight =await Number(weight[0].weight)
//////sleep
const sleep = await activityService.getSleepByUserId({ user_id: req.user._id ,wentToBed: { $gte: startDate, $lte: endDate }} );
  let durationInMinutes = 0;
console.log()
  // Calculate the duration of each workout session
  sleep.forEach((Sleep) => {
    const startTime = new Date(Sleep.wentToBed);
    const endTime = new Date(Sleep.wokeUp);

    // Calculate the duration for this workout session (in minutes)
    const durationMs = endTime - startTime;
    const durationMinutes = durationMs / (1000 * 60); // Convert milliseconds to minutes
    durationInMinutes += durationMinutes;
  });

  new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{
    totalCalories:totalCalories,
    totalSteps:totalSteps,
    totalWater:totalWater,
    workOutTotalDurationMinutes:totalDurationMinutes,
    latestWeight:latestWeight,
    sleepDuration:durationInMinutes
  });
  
});
const dashboard = catchAsync(async (req, res) => {
  const getMeal = await activityService.getMealByUserId({ user_id: req.user._id });
  const getWater = await activityService.getWaterByUserId({ user_id: req.user._id });
  const getStep = await activityService.getStepByUserId({ user_id: req.user._id });
  const workout = await activityService.getWorkOutByUserId({ user_id: req.user._id });
  const getWeight = await activityService.getWeightByUserId({ user_id: req.user._id });
  const getSleep = await activityService.getSleepByUserId({ user_id: req.user._id });
  function mealData(meals) {
    let totalCalories = 0;

  // Calculate total calories from all meals
  meals.forEach((meal) => {
    const carbohydrate = parseFloat(meal.carbohydrate) || 0;
    const protein = parseFloat(meal.protin) || 0;
    const fat = parseFloat(meal.fat) || 0;

    // Calculate calories for the meal
    const caloriesForMeal =
      carbohydrate * 4 + // 4 calories per gram of carbohydrate
      protein * 4 +      // 4 calories per gram of protein
      fat * 9;           // 9 calories per gram of fat

    // Add to the total calories
    totalCalories += caloriesForMeal;
  });
    return totalCalories;
  }

  function stepData(steps) {
    let totalSteps = 0;

    // Sum the steps for the selected records
    steps.forEach((record) => {
      totalSteps += record.step || 0; // Ensure step is a number, or default to 0
    });
     
    return totalSteps;
  }
  function waterData(water) {
    let totalWater = 0;
  // Sum the steps for the selected records
  water.forEach((record) => {
    totalWater +=Number(record.totalVolume) || 0; // Ensure step is a number, or default to 0
  });
     
    return totalWater;
  }

  function workOutData(workOut) {
    let totalDurationMinutes = 0;

  // Calculate the duration of each workout session
  workOut.forEach((workout) => {
    const startTime = new Date(workout.startTime);
    const endTime = new Date(workout.endTime);

    // Calculate the duration for this workout session (in minutes)
    const durationMs = endTime - startTime;
    const durationMinutes = durationMs / (1000 * 60); // Convert milliseconds to minutes
    totalDurationMinutes += durationMinutes;
  });
     
    return totalDurationMinutes;
  }
////////daily Data
///meal
const dailyMeals = getMeal.filter((meal) => isToday(meal.time));
//water
const dailyWater = getWater.filter((water) => isToday(water.time));
////step
const dailyStep = getStep.filter((step) => isToday(step.startTime));
////workout
const dailyWorkOut = workout.filter((workout) => isToday(workout.startTime));
////weight
const dailyWeight = getWeight.filter((weight) => isToday(weight.time));


///////weekly Data
///meal
const weeklyMeals = getMeal.filter((meal) => isThisWeek(meal.time));
//water
const weeklyWater = getWater.filter((water) => isThisWeek(water.time));
////step
const weeklyStep = getStep.filter((step) => isThisWeek(step.startTime));
////workout
const weeklyWorkOut = workout.filter((workout) => isThisWeek(workout.startTime));
////weight
const weeklyWeight = getWeight.filter((weight) => isThisWeek(weight.time));




//////monthly Data
///meal
const monthlyMeals = getMeal.filter((meal) => isThisMonth(meal.time));
//water
const monthlyWater = getWater.filter((water) => isThisMonth(water.time));
//step
const monthlyStep = getStep.filter((step) => isThisMonth(step.startTime));
////workout
const monthlyWorkOut = workout.filter((workout) => isThisMonth(workout.startTime));
////weight
const monthlyWeight = getWeight.filter((weight) => isThisMonth(weight.time));



new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,{
  dailyData:{
    meal:{
      totalCalories:mealData(dailyMeals),
    },
    water:{
      totalWater:waterData(dailyWater),
    },
    step:{
      totalSteps:stepData(dailyStep)
    },
    workOut:{
      workOutTotalDurationMinutes:workOutData(dailyWorkOut),
      workOutData:dailyWorkOut
    },
    weight:{
      weightData:dailyWeight
    }
  },
  weeklyData:{
    meal:{
      totalCalories:mealData(weeklyMeals),
    },
    water:{
      totalWater:waterData(weeklyWater),
    },
    step:{
      totalSteps:stepData(weeklyStep)
    },
    workOut:{
      workOutTotalDurationMinutes:workOutData(weeklyWorkOut),
      workOutData:weeklyWorkOut
    },
    weight:{
      weightData:weeklyWeight
    }
  },
  monthlyData:{
    meal:{
      totalCalories:mealData(monthlyMeals),
    },
    water:{
      totalWater:waterData(monthlyWater),
    },
    step:{
      totalSteps:stepData(monthlyStep)
    },
    workOut:{
      workOutTotalDurationMinutes:workOutData(monthlyWorkOut),
      workOutData:monthlyWorkOut
    },
    weight:{
      weightData:monthlyWeight
    }
  },
});

  
});

const addSubstance = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const addSubstance = await activityService.addSubstance(inputData);
  if (addSubstance) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,addSubstance);

  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const getSubstance = catchAsync(async (req, res) => {
  const substance = await activityService.getSubstanceByUserId({ user_id: req.user._id });
  if (substance) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,substance);
  
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const addCycle = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const addCycle = await activityService.addCycle(inputData);
  if (addCycle) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,addCycle);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
});
const getCycleData = catchAsync(async (req, res) => {
  const cycle = await activityService.getCycleByUserId({ user_id: req.user._id });
  if (cycle) {
    const calculateRemainingSubstance = (initialDosage, hours, halfLife) => {
      return initialDosage * Math.pow(0.5, hours / halfLife);
    };
    var finalData =[]
    for (const singleCycle of cycle) {
      const substance = await activityService.getById(Substance,{_id: singleCycle.substanceId });

      
      const halfLife = substance.halfLife; 
      const dosage = singleCycle.dosage;
      const frequency = singleCycle.frequency;
      const servingPeriod = singleCycle.serving; 
      const startTime = new Date(singleCycle.time);

      const timePeriodMap = {
        'one_week': 7 * 24,
        'two_weeks': 14 * 24,
        'three_weeks': 21 * 24,
        'one_month': 30 * 24,
      };

      const totalServingHours = timePeriodMap[servingPeriod];
      const frequencyMap = {
        'one_hour': 1,
        'three_hours': 3,
        'six_hours': 6,
        'twelve_hours': 12,
        'one_day': 24,
        'two_days': 48,
        'three_days': 72,
        'one_week': 168,
        'two_weeks': 336,
        'three_weeks': 504,
        'one_month': 720,
      };

      const frequencyHours = frequencyMap[frequency];

      let timeData = [];
      let currentHour = 0;
      let remainingSubstance = 0;

     while (currentHour <= totalServingHours + 72) {  
        
        remainingSubstance = calculateRemainingSubstance(remainingSubstance, 1, halfLife);
  
       
        if (currentHour <= totalServingHours && currentHour % frequencyHours == 0) {
          remainingSubstance += dosage;
        }
        timeData.push({
          time: new Date(startTime.getTime() + currentHour * 60 * 60 * 1000), 
          remainingSubstance: Math.max(0, remainingSubstance), 
        });
  
        currentHour++;
      }
     await finalData.push({
name:substance.name,
data:timeData
})
    }
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,finalData);

  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
});
const addGoal = catchAsync(async (req, res) => {
  // console.log(req.user,"0000000000000000")
  let inputData = await req.body;
  inputData.user_id = await req.user._id;
  const data = await activityService.getById(Goal,{user_id:req.user._id})
  if (!data) {

    const addGoal = await activityService.addGoal(inputData);
  if (addGoal) {
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,addGoal);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
  }
    }else{
      const editGoal = await activityService.updateGoalById({_id:data._id},inputData);
      new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,data);
    }
  
});
const getGoalById = catchAsync(async(req,res)=>{
  const data = await activityService.getById(Goal,{user_id:req.user._id})
  if(data){
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,data);
  }else{
        throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);

  }
})
module.exports = {
  addMeal,
  getMealList,
  addWater,
  getWaterList,
  addStep,
  getStepList,
  addWorkOut,
  getWorkOut,
  addWeight,
  getWeight,
  addSleep,
  getSleep,
  getMealById,
  getWaterById,
  getStepById,
  getWorkoutById,
  getWeightById,
  getSleepById,
  getProcessData,
  dashboard,
  addSubstance,
  getSubstance,
  addCycle,
  getCycleData,
  addGoal,
  getGoalById
};

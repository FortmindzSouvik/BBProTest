const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');
const validate = require('../../middlewares/validate');
const activityValidation = require('../../validations/activity.validation');
const activityController = require('../../controllers/activity.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();
const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

// router.get("/getGoogleEvent",docsController.getEvent)
router.route("/addMeal").post(auth(),validate(activityValidation.addMeal),activityController.addMeal)
router.route("/getMeal").get(auth(),activityController.getMealList)
router.route("/getMealById").get(auth(),validate(activityValidation.getData),activityController.getMealById)

router.route("/addWater").post(auth(),validate(activityValidation.addWater),activityController.addWater)
router.route("/getWater").get(auth(),activityController.getWaterList)
router.route("/getWaterById").get(auth(),validate(activityValidation.getData),activityController.getWaterById)
router.route("/addStep").post(auth(),validate(activityValidation.addStep),activityController.addStep)
router.route("/getStep").get(auth(),activityController.getStepList)
router.route("/getStepById").get(auth(),validate(activityValidation.getData),activityController.getStepById)

router.route("/addWorkout").post(auth(),validate(activityValidation.addWorkout),activityController.addWorkOut)
router.route("/getWorkout").get(auth(),activityController.getWorkOut)
router.route("/getWorkoutById").get(auth(),validate(activityValidation.getData),activityController.getWorkoutById)

router.route("/addWeight").post(auth(),validate(activityValidation.addWeight),activityController.addWeight)
router.route("/getWeight").get(auth(),activityController.getWeight)
router.route("/getWeightById").get(auth(),validate(activityValidation.getData),activityController.getWeightById)

router.route("/addSleep").post(auth(),validate(activityValidation.addSleep),activityController.addSleep)
router.route("/getSleep").get(auth(),activityController.getSleep)
router.route("/getSleepById").get(auth(),validate(activityValidation.getData),activityController.getSleepById)
router.route("/getProgressData").get(auth(),validate(activityValidation.getProgressData),activityController.getProcessData)

router.route("/dashboard").get(auth(),activityController.dashboard)

module.exports = router;

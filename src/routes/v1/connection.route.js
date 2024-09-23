const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');
const validate = require('../../middlewares/validate');
const connectionValidation = require('../../validations/connection.validation');
const connectionController = require('../../controllers/connection.controller');
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
router.route("/sendInvitationToCoach").post(auth("sendInvitationToCoach"),validate(connectionValidation.sendInvitationToCoach),connectionController.sendInvitationToCoach)
router.route("/invitationList").get(auth("invitationLink"),connectionController.ivitationList)
router.route("/clientList").get(auth("clientList"),connectionController.clientList)

router.route("/updateInvitation").post(auth("updateInvitation"),validate(connectionValidation.updateInvitationStatus),connectionController.updateInvitation)
router.route("/getCoachList").get(auth("getCoachList"),connectionController.coachList)


module.exports = router;
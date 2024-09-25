const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');
const validate = require('../../middlewares/validate');
const cmsValidation = require('../../validations/cms.validation');
const cmsController = require('../../controllers/cms.controller');
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
router.route("/addCms").post(validate(cmsValidation.addCms),cmsController.addCms)
router.route("/getCms").get(cmsController.getCms)


module.exports = router;
const Joi = require('joi');


const addCms = {
    body: Joi.object().keys({
      privacyCenter: Joi.string().allow('').optional(),
      aboutUs: Joi.string().allow('').optional(),
    }),
  };
  module.exports = {
    addCms
};
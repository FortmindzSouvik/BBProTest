const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const sendInvitationToCoach = {
  body: Joi.object().keys({
    coachMail: Joi.string().required(),
    
  }),
};
const updateInvitationStatus = {
  body: Joi.object().keys({
    id:Joi.string().required(),
    status: Joi.string().required().valid('accept', 'reject'),
    
  }),
};

module.exports = {
    sendInvitationToCoach,
    updateInvitationStatus
  }
const Joi = require('joi');
const { password } = require('./custom.validation');
const roleVal = ["user","coach"]
const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    // password: Joi.string().required().custom(password),
    // name: Joi.string().required(),
    role:Joi.string().valid(...roleVal).error(new Error('Role is required')),
    // dateOfBirth:Joi.string().required(),
    // gender:Joi.string().required(),
    // hight:Joi.string().required(),
    // weight:Joi.string().required(),
    // phoneNumber:Joi.string().required(),
    // experiance:Joi.string().required(),
    // specialization:Joi.string().required(),
    // about:Joi.string().required(),
    // location:Joi.string().required(),
    // certification:Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const createPassword = {
  body: Joi.object().keys({
    id:Joi.string().required(),
    password: Joi.string().required(),
  }),
}
const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
  otp: Joi.number().required(),
  id:Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  createPassword
};

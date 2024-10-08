const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().allow('').optional(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};
const addUserData = {
  body: Joi.object().keys({
    id:Joi.string().required(),
    name: Joi.string().allow('').optional(),
    dateOfBirth: Joi.string().allow('').optional(),
    gender: Joi.string().allow('').optional(),
    hight: Joi.string().allow('').optional(),
    weight: Joi.string().allow('').optional(),
    phoneNumber: Joi.string().allow('').optional(),
    experiance: Joi.string().allow('').optional(),
    specialization: Joi.string().allow('').optional(),
    about: Joi.string().allow('').optional(),
    location: Joi.string().allow('').optional(),

  }),
};
const addcertificate = {
  body: Joi.object().keys({
    id:Joi.string().required(),
    certificate:Joi.string().allow('').optional(),

  }),
};
const deleteAccount = {
  body: Joi.object().keys({
    password:Joi.string().required()

  }),
};
const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUserData,
  addcertificate,
  deleteAccount
};

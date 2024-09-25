const catchAsync = require('../utils/catchAsync');
const ApiSuccess = require('../utils/ApiSuccess');
const ApiError = require('../utils/ApiError');
const respMessage = require('../response.json');
const httpStatus = require('http-status');
const { cmsService } = require('../services');
const currentDate = new Date();
const moment = require('moment');
const { Cms } = require('../models');

const addCms = catchAsync(async (req, res) => {
    let inputData = await req.body;
    const getCms = await cmsService.getCms();
    if(getCms){
    const updateCms = await cmsService.editCms({_id:getCms._id},inputData);
    return new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS);

    }else{
        const addCms = await cmsService.addCms(inputData);
    return new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS);

    }
  });
  const getCms = catchAsync(async (req, res) => {
    const getCms = await cmsService.getCms();
    if(getCms){
    return new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,getCms);

    }else{
        throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
    }
  });
module.exports = {
    addCms,
    getCms
   }
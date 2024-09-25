const httpStatus = require('http-status');
const { Cms } = require('../models');
const ApiError = require('../utils/ApiError');

const addCms=async (data) => {
    const cms = await new Cms(data).save();
    if (!cms) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add cms');
    }
   
    return cms;
  };

  const editCms=async (id,data) => {
    const cms = await Cms.updateOne(id,data);
    return cms;
  };

  const getCms=async () => {
    const cms = await Cms.findOne({});
    return cms;
  };
module.exports = {
    addCms,
    editCms,
    getCms
}
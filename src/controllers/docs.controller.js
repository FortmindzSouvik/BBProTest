const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

const { docsService } = require('../services');
const saveEvent = catchAsync(async (req, res) => {
    const event = await docsService.saveEvent();
    res.send({"code": 201,
    "message": "You Have saved the event",
    "isSuccess": true,
    "data":event,
    // "accessToken": tokens.access.token,
    // "refreshToken": tokens.refresh.token
});
  });
  const getEvent = catchAsync(async (req, res) => {
    const event = await docsService.getEvent();
    res.send({"code": 201,
    "message": "Event list fached successfully",
    "isSuccess": true,
    "data":event,
    // "accessToken": tokens.access.token,
    // "refreshToken": tokens.refresh.token
});
  });
  module.exports = {
    saveEvent,
    getEvent
  };
class ApiSuccess {
    constructor(res, statusCode, message, data,tokens,totalPages,currentPage) {
      let respObj={};
      respObj.code=statusCode || 200;
      respObj.message= message || "success";
      respObj.isSuccess=true;
      respObj.data=data||{};
      if(tokens){
        respObj.accessToken=tokens.access.token;
        respObj.refreshToken=tokens.refresh.token;
      }
      respObj.totalPages=totalPages
      respObj.currentPage=currentPage
      res.status(statusCode || 200).json(respObj);
    }
  }
  
  module.exports = ApiSuccess;
  
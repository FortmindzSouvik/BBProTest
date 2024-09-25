const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { connectionService,userService } = require('../services');
const { User,Connection } = require('../models');

const sendInvitationToCoach = catchAsync(async (req, res) => {
    let findUser = await userService.getUserById(req.user._id)
    if(findUser){
        if(findUser.role = "user"){
            let findUserEmail = await userService.getUserByEmail(req.body.coachMail)
            
            if(findUserEmail){
                if(findUserEmail.role=="coach"){

                    var invitationData = {
                        user_id:req.user._id,
                        coach_id:findUserEmail._id
                    }
                    let getInvitationData =await connectionService.getConnectionData(invitationData)
                    if(getInvitationData){
                        res.send({
                            code: 422,
                            message: 'You already sent invitation',
                            isSuccess: false,
                            }) 
                    }else{
                        let saveInvitationData =await connectionService.addConnectionData(invitationData)
                        if(saveInvitationData){
                            res
                            .status(httpStatus.CREATED)
                            .send({
                              code: httpStatus.CREATED,
                              message: 'Invitation sent',
                              isSuccess: true,
                              data:saveInvitationData,
                            });
                        }
                    }
                    
                }else{
                    res.send({
                        code: 422,
                        message: 'You can only send invitation to coach',
                        isSuccess: false,
                        }) 
                }
                
            }else{
                res.send({
                    code: 422,
                    message: 'No user found',
                    isSuccess: false,
                    }) 
            }

        }else{
            res.send({
                code: 422,
                message: 'You are not authorize to do this action',
                isSuccess: false,
                }) 
        }
    }else{
        res.send({
            code: 422,
            message: 'No user found',
            isSuccess: false,
            }) 
    }
  
  });
const ivitationList =  catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
    let findInvitation = await connectionService.connectionData({coach_id:req.user._id,acceptanceStatus:false}, page, limit, skip)
    if(findInvitation.length>0){
        const totalCount = await connectionService.getCountByUserId(Connection, {coach_id:req.user._id,acceptanceStatus:false});

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);
        res
                            .status(httpStatus.CREATED)
                            .send({
                              code: httpStatus.CREATED,
                              message: 'Invitation list',
                              isSuccess: true,
                              data:findInvitation,
                              totalPages: totalPages,
                            currentPage: page,
                            });
    }else{
        res
        .status(httpStatus.CREATED)
        .send({
          code: 422,
          message: 'No invitation found',
          isSuccess: false,
        //   data:findInvitation,
        });
    }

})
const clientList =  catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
    let findInvitation = await connectionService.connectionData({coach_id:req.user._id,acceptanceStatus:true}, page, limit, skip)
    if(findInvitation.length>0){
        const totalCount = await connectionService.getCountByUserId(Connection, {coach_id:req.user._id,acceptanceStatus:true});

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);
        res
                            .status(httpStatus.CREATED)
                            .send({
                              code: httpStatus.CREATED,
                              message: 'Client list',
                              isSuccess: true,
                              data:findInvitation,
                              totalPages: totalPages,
                            currentPage: page,
                            });
    }else{
        res
        .status(httpStatus.CREATED)
        .send({
          code: 422,
          message: 'No client found',
          isSuccess: false,
        //   data:findInvitation,
        });
    }

})
 const updateInvitation =  catchAsync(async (req, res) => {
   
    if(
        req.body.status == "accept"
    ){
        let updateInvitation = await connectionService.updateConnectionStatus({_id:req.body.id},{acceptanceStatus:true})
        const findInvitation = await connectionService.inviteData({_id:req.body.id})
        return res.status(httpStatus.CREATED)
        .send({
          code: httpStatus.CREATED,
          message: 'Invitation accepted',
          isSuccess: true,
          data:findInvitation,
        });
    }else if(req.body.status == "reject"){
        let rejectInvitation = await connectionService.deleteConnection({_id:req.body.id})
        const findInvitation = await connectionService.inviteData({_id:req.body.id})
        return res.status(httpStatus.CREATED)
        .send({
          code: httpStatus.CREATED,
          message: 'Invitation rejected',
          isSuccess: true,
          data:findInvitation,
        });
    }

})
const coachList =  catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate skip value
  const skip = (page - 1) * limit;
    let findInvitation = await connectionService.connectionData({user_id:req.user._id,acceptanceStatus:true}, page, limit, skip)
    if(findInvitation.length>0){
        const totalCount = await connectionService.getCountByUserId(Connection, {user_id:req.user._id,acceptanceStatus:true});

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);
        res
                            .status(httpStatus.CREATED)
                            .send({
                              code: httpStatus.CREATED,
                              message: 'Coach list',
                              isSuccess: true,
                              data:findInvitation,
                              totalPages: totalPages,
                            currentPage: page,
                            });
    }else{
        res
        .status(httpStatus.CREATED)
        .send({
          code: 422,
          message: 'No coach found',
          isSuccess: false,
        //   data:findInvitation,
        });
    }

})
module.exports = {
    sendInvitationToCoach,
    ivitationList,
    updateInvitation,
    coachList,
    clientList
}
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const respMessage = require('../response.json');
const catchAsync = require('../utils/catchAsync');
const { authService,userService ,tokenService} = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});
const addUserData = catchAsync(async (req, res) => {
  let findUser = await userService.getUserById(req.body.id)
  const tokens = await tokenService.generateAuthTokens(findUser);
  if(findUser.isEmailVerified = true){
    let updateData = {
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      hight: req.body.hight,
      weight: req.body.weight,
      phoneNumber: req.body.phoneNumber,
      experiance: req.body.experiance,
      specialization: req.body.specialization,
      about: req.body.about,
      location: req.body.location,
    }
    await userService.updateUserById(findUser._id,updateData);
    let user = await userService.getUserById(req.body.id)
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS,user,tokens);
   
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, 'Email is not verified');

  }

});
const uploadCertificate = catchAsync(async (req, res) => {
  let file = req.files.certificate
  function getExtension(filename) {
    return filename.substring(filename.indexOf(".") + 1);
  }
  var ext = getExtension(file.name);

  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  let sampleFile = file;
  var file_name = `certificate-${Math.floor(Math.random() * 1000)}-${Math.floor(
    Date.now() / 1000
  )}.${ext}`;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`public/${file_name}`,async function (err) {
    if (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to upload certificate');
    } else {
      let findUser = await userService.getUserById(req.body.id)
      if(findUser){
        let updateData = {
          certification: {name:file_name},
          
        }
        await userService.addCertification(findUser._id,updateData);
    new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS);

      }
    }
  });

});
const deleteAccount = catchAsync(async (req, res) => {
  let comparePassword =await authService.checkPassword({_id:req.user._id}, req.body.password)
  if(comparePassword){
    const user = await userService.updateUserById(req.user._id, {isdeleted:true})
    new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS);

  }else{
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.ACOUNT_DELETE_FAIL);

  }
 
});
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUserData,
  uploadCertificate,
  deleteAccount
};

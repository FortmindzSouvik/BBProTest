const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiSuccess = require('../utils/ApiSuccess');
const ApiError = require('../utils/ApiError');
const respMessage = require('../response.json');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const bcrypt = require("bcrypt")
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // Create an email object
  const otp = Math.floor(100000 + Math.random() * 900000); 
  const msg = {
    to: req.body.email, // Recipient's email address
    from: 'koushik.pramanick@fortmindz.com', // Verified sender email (in your SendGrid account)
    subject: 'Email verification',
    text: 'OTP for email verification', // Plain text body
    html: `<strong>${otp} <br> OTP for email verification</strong>`, // HTML body
  };
  sgMail
    .send(msg)
    .then(async() => {
      const updateUser = await userService.updateUserById(user._id,{otp:otp})
      const tokens = await tokenService.generateAuthTokens(user);
      new ApiSuccess(res, httpStatus.OK, respMessage.SIGNUP_SUCCESS, user);
    })
    .catch((error) => {
      throw new ApiError(httpStatus.BAD_GATEWAY, respMessage.FAIL);
     
    });
  

  
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  // console.log(user.password,password,"0000000")
  // const isMatch = await bcrypt.compare(password, user.password);
  if(user){
    const tokens = await tokenService.generateAuthTokens(user);
    new ApiSuccess(res, httpStatus.OK, respMessage.LOGIN_SUCCESS, user, tokens);
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.LOGIN_FAIL);
  }
 
});
const createPassword = catchAsync(async (req, res) => {
  const { id, password } = req.body;
  let findUser = await userService.getUserById(id)
  // let createPassword = await bcrypt.hash(password,10)
  findUser.password = await  password
 let savePassword =  await findUser.save()
if(savePassword){
  new ApiSuccess(res, httpStatus.CREATED, respMessage.PASSWORD_CREATION);
}else{
  throw new ApiError(httpStatus.NOT_FOUND, respMessage.PASSWORD_CREATION_FAIL);
 
}
  
});
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  let findUser = await userService.getUserByEmail(req.body.email)
  if(findUser){
    const otp = Math.floor(100000 + Math.random() * 900000); 
    const msg = {
      to: req.body.email, // Recipient's email address
      from: 'koushik.pramanick@fortmindz.com', // Verified sender email (in your SendGrid account)
      subject: 'Email verification',
      text: 'OTP for email verification', // Plain text body
      html: `<strong>${otp} <br> OTP for forgot password email verification </strong>`, // HTML body
    };
    sgMail
      .send(msg).then(async()=>{
        const updateUser = await userService.updateUserById(findUser._id,{otp:otp,isEmailVerified:false})
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,findUser);
      }).catch((error)=>{
  throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
      })
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, respMessage.FAIL);
    
  }
  
  // const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  
});

const resetPassword = catchAsync(async (req, res) => {
  let findUser = await userService.getUserById(req.body.id)
  if(findUser.isEmailVerified==true){
    await userService.updateUserById(findUser._id, { password: req.body.password });
  new ApiSuccess(res, httpStatus.CREATED, respMessage.SUCCESS,findUser);
  }else{
    throw new ApiError(httpStatus.UNAUTHORIZED, respMessage.FAIL);
  }
  // await authService.resetPassword(req.query.token, req.body.password);
  // res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  let findUserOtp = await userService.getUserById(req.body.id)
  if(findUserOtp.otp==req.body.otp){
    await userService.updateUserById(req.body.id, { isEmailVerified: true });
  new ApiSuccess(res, httpStatus.OK, respMessage.SUCCESS);

  }else{
    throw new ApiError(httpStatus.BAD_REQUEST, respMessage.FAIL);
  }
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  createPassword
};

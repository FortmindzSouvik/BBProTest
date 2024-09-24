const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const bcrypt = require("bcrypt")
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
 ;
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
      res
    .status(httpStatus.CREATED)
    .send({
      code: 201,
      message: 'We have sent a verification code to your email for verification',
      isSuccess: true,
      data:user,
      // accessToken: tokens.access.token,
      // refreshToken: tokens.refresh.token,
    });
    })
    .catch((error) => {
      res.send({
        code: 422,
      message: 'Failed to send mail',
      isSuccess: false,
      // data:user,
      // accessToken: tokens.access.token,
      // refreshToken: tokens.refresh.token,
      })
      console.error('Error sending email: ', error);
    });
  

  
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  // console.log(user.password,password,"0000000")
  // const isMatch = await bcrypt.compare(password, user.password);
  if(user){
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({  code: 201,
      message: 'Login successfully',
      isSuccess: true,
      data:user,
      accessToken: tokens.access.token,
      refreshToken: tokens.refresh.token,});
  }else{
    res.send({  code: 422,
      message: 'Invalid email or password',
      isSuccess: false,
      // data:user,
      // accessToken: tokens.access.token,
      // refreshToken: tokens.refresh.token,
    });
  }
 
});
const createPassword = catchAsync(async (req, res) => {
  const { id, password } = req.body;
  let findUser = await userService.getUserById(id)
  // let createPassword = await bcrypt.hash(password,10)
  findUser.password = await  password
 let savePassword =  await findUser.save()
if(savePassword){
  res.send({
    code: 201,
  message: 'Password created successfully',
  isSuccess: true,
  // data:user,
  // accessToken: tokens.access.token,
  // refreshToken: tokens.refresh.token,
  })
}else{
  res.send({
    code: 422,
  message: 'Password creation failed',
  isSuccess: false,
  // data:user,
  // accessToken: tokens.access.token,
  // refreshToken: tokens.refresh.token,
  })
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
        res
      .status(httpStatus.CREATED)
      .send({
        code: 201,
        message: 'We have sent a verification code to your email for verification',
        isSuccess: true,
        data:findUser,
        // accessToken: tokens.access.token,
        // refreshToken: tokens.refresh.token,
      });
      }).catch((error)=>{
        res.send({
          code: 422,
        message: 'No user found',
        isSuccess: false,
        error:error,
        // accessToken: tokens.access.token,
        // refreshToken: tokens.refresh.token,
        })
      })
  }else{
    res.send({
      code: 422,
    message: 'No user found',
    isSuccess: false,
    // data:user,
    // accessToken: tokens.access.token,
    // refreshToken: tokens.refresh.token,
    })
  }
  
  // const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  
});

const resetPassword = catchAsync(async (req, res) => {
  let findUser = await userService.getUserById(req.body.id)
  if(findUser.isEmailVerified==true){
    await userService.updateUserById(findUser._id, { password: req.body.password });
    res
    .status(httpStatus.CREATED)
    .send({
      code: 201,
      message: 'You have successfully reset your password',
      isSuccess: true,
      data:findUser,
      // accessToken: tokens.access.token,
      // refreshToken: tokens.refresh.token,
    });
  }else{
 res.send({
      code: 422,
    message: 'Email is not verified',
    isSuccess: false,
    // data:user,
    // accessToken: tokens.access.token,
    // refreshToken: tokens.refresh.token,
    })
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
    res.send({
      code:201,
    message: 'OTP verified successfully',
    isSuccess: true,
    })
  }else{
    res.send({
      code:422,
    message: 'Please enter a valid otp',
    isSuccess: false,
    })
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

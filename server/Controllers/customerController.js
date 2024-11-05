const Customer = require("../Models/customerModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");
const jwt= require('jsonwebtoken')
const util = require('util')
require("dotenv").config();

const signToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new customError(
      "Please provide email and password for login.",
      400
    );
    return next(err);
  }
  const customer = await Customer.findOne({ email: email }).select("+password");
  if (
    !customer ||
    !(await customer.comparePasswordInDB(password, customer.password))
  ) {
    return next(new customError("Incorrect email or password.", 400));
  }
  const token = signToken(customer._id);
  res.status(200).json({
    status: "success",
    token: token,
    data: {
      customer,
    },
  });
});

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const customer = await Customer.create(req.body);
  const token = signToken(customer._id);
  res.status(201).json({
    status: "success",
    token: token,
    data: {
      customer,
    },
  });
});

exports.protect= asyncErrorHandler(async(req,res,next)=>{
  const testToken= req.headers.authorization;
  let token;
  if(testToken && testToken.startsWith('bearer')){
    token=testToken.split(' ')[1];
  }
  if(!token){
    return next(new customError('You are not logged in.',401))
  }
  const decodedToken= await util.promisify(jwt.verify)(token, process.env.SECRET_STR)  
  console.log("Hey", decodedToken);
  //if the token has expired then verify() throw an error with named 'TokenExpiredError'
  
  const customer= await Customer.findById(decodedToken.id);
  if(!customer) return next(new customError("The user with given token does not exist",401))
 
  // if(await user.isPasswordChanged(decodedToken.iat)){
  //   return next(new customError('The password has changed recently, Please login again', 401))
  // }

  req.customer=customer;
  next();
})

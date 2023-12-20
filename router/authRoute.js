const express=require("express");
const { signIn, signup, getUser, logout } = require("../controller/authController");
const jwtAuth = require("../middleware/jwtAuth");
const loginDataValidate = require("../middleware/logindata.validator");
const signupDataValidate = require("../middleware/signupdata.validator");
const authRouter=express.Router();


authRouter.post("/signup",signupDataValidate,signup)
authRouter.post("/signin",loginDataValidate,signIn)
authRouter.get("/user",jwtAuth,getUser)
authRouter.get("/logout",jwtAuth,logout)


module.exports=authRouter
const express=require("express");
const { userController } = require("../../controllers");
const { authUserMiddlewares } = require("../../middlewares/");
const userRouter=express.Router();

userRouter.post("/signup",authUserMiddlewares.validateAuthRequest,userController.createUser);
userRouter.post("/signin",authUserMiddlewares.validateAuthRequest,userController.signIn);

module.exports=userRouter;
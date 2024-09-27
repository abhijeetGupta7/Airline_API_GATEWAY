const express=require("express");
const { userController } = require("../../controllers");
const userRouter=express.Router();

userRouter.post("/signup",userController.createUser);
userRouter.get("/signin",userController.signIn);

module.exports=userRouter;
const express=require("express");
const { userController } = require("../../controllers");
const { authUserMiddlewares } = require("../../middlewares/");
const userRouter=express.Router();

userRouter.post("/signup",authUserMiddlewares.validateAuthRequest,userController.createUser);
userRouter.post("/signin",authUserMiddlewares.validateAuthRequest,userController.signIn);
userRouter.post("/role",authUserMiddlewares.authenticateUser, authUserMiddlewares.isAdmin, userController.addRoleToUser);
userRouter.get("/:id",userController.getUserEmailById);

module.exports=userRouter;
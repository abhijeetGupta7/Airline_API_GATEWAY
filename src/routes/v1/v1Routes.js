const expres=require('express');
const { infoController } = require('../../controllers');
const userRouter = require('./userRoutes');
const { authUserMiddlewares } = require('../../middlewares/');

const v1Router=expres.Router();

v1Router.get("/ping",authUserMiddlewares.authenticateUser,infoController);
v1Router.use("/user",userRouter);

module.exports=v1Router;
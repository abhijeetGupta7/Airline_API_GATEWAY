const expres=require('express');
const { infoController } = require('../../controllers');
const userRouter = require('./userRoutes');

const v1Router=expres.Router();

v1Router.get("/ping",infoController);
v1Router.use("/signup",userRouter);

module.exports=v1Router;
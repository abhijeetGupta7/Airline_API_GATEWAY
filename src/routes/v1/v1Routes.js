const expres=require('express');
const { infoController } = require('../../controllers');

const v1Router=expres.Router();

v1Router.get("/ping",infoController);

module.exports=v1Router;
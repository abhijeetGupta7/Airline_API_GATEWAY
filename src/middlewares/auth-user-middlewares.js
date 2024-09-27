const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");
const AppError = require("../utils/errors/app-error");

const userService=new UserService();

function validateAuthRequest(req,res,next) {
    if(!req.body.email) {
        ErrorResponse.message="Something went wrong while authenticating User";
        ErrorResponse.error={ details: "Email not found in the request body in the correct form" };
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);       
    }
    if(!req.body.password) {
        ErrorResponse.message="Something went wrong while authenticating User";
        ErrorResponse.error={ details: "Password not found in the request body in the correct form" };
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse); 
    }
    next();
}

async function authenticateUser(req,res,next) {
    try {
        const bearerHeader=req.headers['x-access-token'];   // it's practice that token is prepended by "Bearer" string
        const bearer=bearerHeader.split(' '); 
        req.token=bearer[1];     
        const userId=await userService.authenticateUser(req.token);
        if(!userId) throw new AppError("User not Found",StatusCodes.BAD_REQUEST);
        req.userId=userId;      // setting the userId in the req object as user
        next();
    } catch (error) {
        ErrorResponse.message="Something went wrong while authentication";
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


module.exports={
    validateAuthRequest,
    authenticateUser
}
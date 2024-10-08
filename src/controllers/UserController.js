const { StatusCodes, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const userService=new UserService();

/**
 * POST : /signup/
 *  req.body : { email: xyz, password: abc }
 */
async function createUser(req,res) {
    try {
        const response = await userService.createUser({
            email:req.body.email,
            password:req.body.password
        });    
        SuccessResponse.data=response;
        SuccessResponse.message="Successfully created the User";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.message="Something went wrong while creating User";
        ErrorResponse.error=error;
        return res.status(error.statusCode || INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 * POST : /signin/
 *  req.body : { email: xyz, password: abc }
 */
async function signIn(req,res) {
    try {
        const response=await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.message="Successfully Logged in";
        SuccessResponse.data=response
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Log in failed";
        ErrorResponse.data=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function addRoleToUser(req,res) {
    try {
        const response=await userService.addRoleToUser({
            role: req.body.role,
            id: req.body.id
        });
        SuccessResponse.message="Successfully added the Role to User";
        SuccessResponse.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while addding Role to User";
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }   
}

async function getUserEmailById(req,res) {
    try {
        const response=await userService.getUserEmail(req.params.id);
        SuccessResponse.data=response;
        SuccessResponse.message="Successfully fetched the User";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while getting the User";
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports={
    createUser,
    signIn,
    addRoleToUser,
    getUserEmailById
}
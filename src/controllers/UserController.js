const { StatusCodes, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const userService=new UserService();

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

module.exports={
    createUser
}
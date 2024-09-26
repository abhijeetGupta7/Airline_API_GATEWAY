const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const { SuccessResponse }=require("../utils/common/");
const AppError = require("../utils/errors/app-error");

class UserService {
    #userRepository;
    constructor() {
        this.#userRepository=new UserRepository();
    }

    async createUser(data) {
        try {
            const user=await this.#userRepository.create(data);
            return user;
        } catch (error) {
            console.log(error);
            if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError') {
                let details=[];
                error.errors.forEach((err)=>{
                    details.push(err.message);
                })
                console.log(details);
                throw new AppError(details,StatusCodes.BAD_REQUEST);
            }
            throw error;
        }
    }
}

module.exports=UserService;
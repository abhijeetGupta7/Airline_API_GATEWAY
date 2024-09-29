const { StatusCodes } = require("http-status-codes");
const { UserRepository, RoleRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Auth, Enums } = require("../utils/common/");
const { ENUM } = require("sequelize");


class UserService {
    #userRepository;
    #roleRepository;
    constructor() {
        this.#userRepository=new UserRepository();
        this.#roleRepository=new RoleRepository();
    }

    async createUser(data) {
        try {
            const user=await this.#userRepository.create(data);
            const role=await this.#roleRepository.getRoleByName(Enums.USER_ROLES.CUSTOMER);
            user.addRole(role);
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

    async signIn(data) {
        try {
            const user=await this.#userRepository.getUserByEmail(data.email);
            if(!user) {
                throw new AppError("User does not exist",StatusCodes.NOT_FOUND);
            }
            const isMatch=await Auth.checkPassword(data.password,user.password);
            if(!isMatch) throw new AppError("Username and Password does not match",StatusCodes.BAD_REQUEST);
            
            const jwt=Auth.createToken({id: user.id, email: user.email});
            return jwt;
        } catch (error) {
            throw error;
        }
    }

    async authenticateUser(token) {
        try {
            if(!token) {
                throw new AppError("Missing JWT token",StatusCodes.BAD_REQUEST);
            }
            const user=await Auth.verifyToken(token);
            console.log(user);
            const userId=await this.#userRepository.get(user.id);
            if(!userId) {
                throw new AppError("User not Found",StatusCodes.NOT_FOUND);
            }
            return user.id;
        } catch (error) {
            if(error instanceof AppError) throw error;
            if(error.name=='JsonWebTokenError') {
                throw new AppError("Invalid JWT",StatusCodes.BAD_REQUEST);
            }
            if(error.name=='TokenExpiredError') {
                throw new AppError("JWT token expired",StatusCodes.BAD_REQUEST);
            }
            console.log(error);
            throw error;
        }
    }
}

module.exports=UserService;
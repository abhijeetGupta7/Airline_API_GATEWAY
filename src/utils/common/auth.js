const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../../config/server-config');

async function checkPassword(plainPassword,encryptedPassword) {
    try {
        const isMatch=await bcrypt.compare(plainPassword,encryptedPassword);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

async function createToken(input) {
    try {
        const token=jwt.sign(input , JWT_SECRET, { expiresIn: JWT_EXPIRY });  // sync sign is used here, however async version is preferred
        return {jwt: token };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function verifyToken(token) {
    try {
        const decodedToken=jwt.verify(token,JWT_SECRET);  // here verify is also sync, although, the function we made is async, in future, we just have to change the sign and verify method to their async versions only
        return decodedToken;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    checkPassword,
    createToken,
    verifyToken
}
const applicationError = require('../../config/error/applicationError');
const userRepositories = require('../repositories/userRepositories');
const authServices = require('./authServices');

const createUser = async(payload) => {

    try {
        const {password} = payload;
        if (!password) {
            throw new applicationError(`password is required`, 400);
        };

        const encryptedPassword = await authServices.encryptPassword(password);

        const encryptedPayload = {
            encryptedPassword,
            ...payload
        }
        const newUser = await userRepositories.createUser(encryptedPayload);

        return newUser;

    } catch (err) {
        if (err.name == "SequelizeValidationError") {
            const errors = err.errors.map(err => err.message);
            throw new applicationError(`Failed to create new user : ${errors}`, 400);
        };

        throw new applicationError(`Failed to create new user : ${err.message}`, err.statusCode || 500);
    };
};

const findUserByEmail = async(credentilas) => {

    try {
        const {email} = credentilas;
        if (!email) {
            throw new applicationError('email is required', 400);
        };

        const user = await userRepositories.findUserByEmail(email);

        if (!user) {
            throw new applicationError('user not found', 400);
        }
        return user;

    } catch (err) {
        throw new applicationError(`Failed to get user information : ${err.message}`, err.statusCode || 500);
    };
};

const isUserPwRight = async(credentilas, user) => {

    try {
        const {password} = credentilas;
        if (!password) {
            throw new applicationError('password is required', 400);
        };

        const {encryptedPassword} = user;

        const isRightPw = await authServices.comparePassword(password, encryptedPassword);
        if (!isRightPw) {
            throw new applicationError('wrong password', 400);
        };

        return user;

    } catch (err) {
        throw new applicationError(`Failed to validate password : ${err.message}`, err.statusCode || 500);
    };

}

module.exports = {
    createUser,
    findUserByEmail,
    isUserPwRight,
}
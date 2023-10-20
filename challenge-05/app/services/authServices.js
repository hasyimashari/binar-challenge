const applicationError = require('../../config/error/applicationError');
const bcrypt = require('bcrypt');

const encryptPassword = async(pw) => {

    try {        
        const genRandomNumber = Math.floor((Math.random() * 10));
    
        const genSalt = await bcrypt.genSalt(genRandomNumber);
        const hashedPassword = await bcrypt.hash(pw, genSalt);
    
        return hashedPassword;

    } catch (err) {
        throw new applicationError(`Failed to hash password : ${err.message}`, 500);
    };
};

const comparePassword = async(pw, hashedPw) => {

    try {
        const isCorrectPw = await bcrypt.compare(pw, hashedPw);
        return isCorrectPw;

    } catch (err) {
        throw new applicationError(`Failed to compare password : ${err.message}`, 500);
    };
};

module.exports = {
    encryptPassword,
    comparePassword
}
const userServices = require('../services/userServices');

const isUserFoundByEmail = async(req, res, next) => {

    try {
        const credentilas = req.body;
        const user = await userServices.findUserByEmail(credentilas);

        req.user = user;
        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'Fail',
            message: err.message
        })
    }
}

module.exports = {
    isUserFoundByEmail,
}
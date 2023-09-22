const Car = require('../model/cars');

const isAvailMiddleware = (req, res, next) => {

    const {id} = req.params;
    const car = Car.getCar(id);

    if (!car) {
        res.status(404).json({message: "id not found"});
        return;
    }

    next();
};

module.exports = {
    isAvailMiddleware,
};
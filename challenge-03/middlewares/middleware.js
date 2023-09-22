const Car = require('../model/cars');

const isAvailMiddleware = (req, res, next) => {

    const {id} = req.params;
    const car = Car.getCar(id);

    if (!car) {
        res.status(404).json({message: "id not found"});
        return;
    }

    req.id = id;
    next();
};

const isDataEmpty = (req, res, next) => {

    const {image, rentPerDay, capacity, description, availableAt} = req.body;
    
    if ( !image || 
        !rentPerDay || 
        !capacity || 
        !description || 
        !availableAt) {
        res.status(400).json({message: "all data cannot empty"});
        return;
    }

    req.data = req.body;
    next();
};

const isRightType = (req, res, next) => {

    const {image, rentPerDay, capacity, description, availableAt} = req.data;
    
    if ( typeof image != "string" || 
        typeof rentPerDay != "number" ||
        typeof capacity != "number" || 
        typeof description != "string" || 
        typeof availableAt != "string") {
        res.status(400).json({message: "all data must be in right type"});
        return;
    }

    req.payload = req.data;
    next();
};

module.exports = {
    isAvailMiddleware,
    isDataEmpty,
    isRightType,
};
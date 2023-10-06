const {car} = require("../models");

const isAvailable = async(req, res, next) => {

    const {id} = req.params;
    const carData = await car.findByPk(id);

    if (!carData) {
        res.status(404).json({ message: "car id not found" })
    };

    req.carData = carData;
    next();
};

const isDataEmpty = (req, res, next) => {

    const {name, type, image, capacity, rentPerDay, description, availableAt} = req.body;
    
    if (!name ||
        !type || 
        !image || 
        !capacity || 
        !rentPerDay || 
        !description || 
        !availableAt) {

        res.status(400).json( {message: "data cannot empty"} );
        return;
    };

    req.carData = req.body;
    next();
};

const isRightDataType = (req, res, next) => {

    const {name, type, image, capacity, rentPerDay, description, availableAt} = req.carData;
    
    if (typeof name != "string" ||
        typeof type != "string" ||
        typeof image != "string" || 
        typeof capacity != "number" || 
        typeof rentPerDay != "number" ||
        typeof description != "string" || 
        typeof availableAt != "string") {

        res.status(400).json( {message: "data must be in right type"} );
        return;
    };

    {req.carData};
    next();
};

const isRightCarType = (req, res, next) => {

    const carType = ["small", "medium", "large"];
    const {type} = req.carData;

    const checkType = carType.includes(type);

    if (!checkType) {
        res.status(400).json( {message: "type must be either small, medium, or large" } );
        return;
    };

    {req.carData};
    next();
}


module.exports = {
    isAvailable,
    isDataEmpty,
    isRightDataType,
    isRightCarType
}

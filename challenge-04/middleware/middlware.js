const {car} = require("../models");

const isAvailable = async(req, res, next) => {

    try {

        const {id} = req.params;
        const carData = await car.findByPk(id);
    
        if (!carData) {
            res.status(404).json({ 
                message: "car id not found" 
            });
        };
    
        req.carData = carData;
        next();

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    };
};

module.exports = {
    isAvailable,
}

const {car} = require("../models");

const getPing = (req, res) => {
    res.status(200).json({message: "ping succesfully"});
};

const getListCars = async(req, res) => {
    try {
        const data =  await car.findAll();
        res.status(200).json({
            message: "get data succeeded",
            data: data});

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    };
};

const getCar = async(req, res) => {
    try {
        const data = req.carData;
        res.status(200).json({
            message: "get data succeeded",
            data: data});

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    };
};

const createCar = async(req, res) => {
    try {
        const newData = req.body;
        const newCar =  await car.create(newData);

        res.status(201).json({
            message: "new data successfully created",
            newData: newCar
        });

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    };
};

const updateCar = async(req, res) => {
    try {
        const {id} = req.carData;
        const newData = req.body;

        const [,updatedCar] =  await car.update(newData, {where : {id} ,returning: true});

        res.status(201).json({
            message: "data successfully updated",
            newData: updatedCar
        });

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    };
};

const deleteCar = async(req, res) => {
    try {
        const {id} = req.carData;
        await car.destroy({ where: {id} });

        res.status(200).json({
            message: "data successfully deleted"
        });

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    };
};

const notFound = (req, res) => {
    res.status(404).json({ message: "end point not found or wrong method" })
}

module.exports = {
    getPing,
    getListCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
    notFound,
}
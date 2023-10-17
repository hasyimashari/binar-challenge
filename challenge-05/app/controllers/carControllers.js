const carServices = require('../services/carServices')

const getPing = (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "ping succesfully"
    });
};

const getListCars = async (req, res) => {

    try {
        const data = await carServices.getCars();

        res.status(200).json({
            status: 'OK',
            message: 'get cars data succes',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    };
};

const getCar = async (req, res) => {

    try {
        const data = req.carData;

        res.status(200).json({
            status: 'OK',
            message: 'get car data succes',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    };
};

const createCar = async (req, res) => {
    try {
        const payload = req.body;
        const data = await carServices.createCar(payload);

        res.status(201).json({
            status: 'OK',
            message: 'create car data succes',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

const updateCar = async (req, res) => {
    try {

        const { id } = req.carData;
        const newData = req.body;

        const data = await carServices.updateCar(newData, id);

        res.status(201).json({
            satus: 'OK',
            message: 'updated car success',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.carData;
        await carServices.deleteCar(id);

        res.status(200).json({
            staus: 'OK',
            message: "data successfully deleted"
        });

    } catch (err) {
        res.status(err.statusCode).json({
            satus: 'FAIL',
            message: err.message
        });
    };
};

const notFound = (req, res) => {
    res.status(404).json({
        message: "end point not found or wrong method"
    })
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
const Car = require('../model/cars');

function pingHandler(req, res) {
    res.status(200).json({ 'message' : "ping succesfully"});
}

function getListCarsHandler (req, res) {
    const listCars = Car.getListCars();

    res.status(200).json(listCars);
};

function getCarHandler (req, res) {

    const {id} = req.params;
    const car = Car.getCar(id); 

    res.status(200).json(car);
};

function createCarHandler (req, res) {

    const data = req.body;
    const newCar = Car.createCar(data);

    res.status(200).json(newCar);
};

function updateCarHandler (req, res) {

    const {id} = req.params;
    const data = req.body;

    const updatedCar = Car.updateCar(id, data);

    res.status(200).json(updatedCar);
};

function deleteCarHandler (req, res) {

    const {id} = req.params;
    const deleletedCar = Car.deleteCar(id);

    res.status(200).json(deleletedCar);
};

function noRouteHandler (req, res) {
    res.status(404).json({message: "page not found"})
};

module.exports = {
    pingHandler,
    getListCarsHandler,
    getCarHandler,
    createCarHandler,
    updateCarHandler,
    deleteCarHandler,
    noRouteHandler
};
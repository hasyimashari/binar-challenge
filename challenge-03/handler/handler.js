const Car = require('../model/cars');

const pingHandler = (req, res) => {
    res.status(200).json({ 'message' : "ping succesfully"});
};

const getListCarsHandler = (req, res) => {
    const listCars = Car.getListCars();

    res.status(200).json(listCars);
};

const getCarHandler = (req, res) => {

    const car = Car.getCar(req.id); 

    res.status(200).json(car);
};

const createCarHandler = (req, res) => {

    const newCar = Car.createCar(req.payload);

    res.status(201).json(newCar);
};

const updateCarHandler = (req, res) => {

    const updatedCar = Car.updateCar(req.id, req.payload);

    res.status(201).json(updatedCar);
};

const deleteCarHandler = (req, res) => {

    const deleletedCar = Car.deleteCar(req.id);

    res.status(200).json(deleletedCar);
};

const noRouteHandler = (req, res) => {
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
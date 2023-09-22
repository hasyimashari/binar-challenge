const Car = require('../model/cars');

const pingHandler = (req, res) => {
    res.status(200).json({ 'message' : "ping succesfully"});
};

const getListCarsHandler = (req, res) => {
    const listCars = Car.getListCars();

    res.status(200).json(listCars);
};

const getCarHandler = (req, res) => {

    const {id} = req.params;
    const car = Car.getCar(id); 

    res.status(200).json(car);
};

const createCarHandler = (req, res) => {

    const data = req.body;
    const newCar = Car.createCar(data);

    res.status(201).json(newCar);
};

const updateCarHandler = (req, res) => {

    const {id} = req.params;
    const data = req.body;

    const updatedCar = Car.updateCar(id, data);

    res.status(201).json(updatedCar);
};

const deleteCarHandler = (req, res) => {

    const {id} = req.params;
    const deleletedCar = Car.deleteCar(id);

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
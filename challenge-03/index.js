const express = require('express');
const Car = require('./model/cars');

const app = express();
const PORT = '3000';

app.use(express.json());

app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
});

// return response message
app.get('/', (req, res) => {
    res.status(200).json({ 'message' : "ping succesfully"});
});

// return list of cars
app.get('/cars', (req, res) => {
    const listCars = Car.getListCars();

    res.status(200).json(listCars);
});

// return one car item
app.get('/cars/:id', (req, res) => {

    const {id} = req.params;
    const car = Car.getCar(id); 

    res.status(200).json(car);
});

// return new car item
app.post('/cars', (req, res) => {

    const data = req.body;
    const newCar = Car.createCar(data);

    res.status(200).json(newCar);
});

// return updated car item
app.put('/cars/:id', (req, res) => {

    const {id} = req.params;
    const data = req.body;

    const updatedCar = Car.updateCar(id, data);

    res.status(200).json(updatedCar);
});

// return deleted cars item
app.delete('/cars/:id', (req, res) => {

    const {id} = req.params;
    const deleletedCar = Car.deleteCar(id);

    res.status(200).json(deleletedCar);
});

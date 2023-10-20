const express = require('express');
const carController = require('./app/controllers/carControllers');
const carMiddleware = require('./app/middleware/carMiddlware');

const userController = require('./app/controllers/userController');
const userMiddleware = require('./app/middleware/userMiddleware'); 

const app = express();
const PORT = '3000';

app.use(express.json());

app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
});

app.get('/', carController.getPing);
app.get('/cars',carController.getListCars);
app.get('/cars/:id', carMiddleware.isAvailable, carController.getCar);
app.post('/cars', carController.createCar);
app.put('/cars/:id', carMiddleware.isAvailable, carController.updateCar);
app.delete('/cars/:id', carMiddleware.isAvailable, carController.deleteCar);

app.post('/register', userController.createUser);
app.post('/login', userMiddleware.isUserFoundByEmail, userController.userLogin);

app.all('*', carController.notFound);
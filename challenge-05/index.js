const express = require('express');
const handler = require('./app/controllers/handler/handler');
const middleware = require('./app/controllers/middleware/middlware');

const app = express();
const PORT = '3000';

app.use(express.json());

app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
});

app.get('/', handler.getPing);
app.get('/cars',handler.getListCars);
app.get('/cars/:id', middleware.isAvailable, handler.getCar);
app.post('/cars', handler.createCar);
app.put('/cars/:id', middleware.isAvailable, handler.updateCar);
app.delete('/cars/:id', middleware.isAvailable, handler.deleteCar);

app.all('*', handler.notFound);
const express = require('express');
const handler = require('./handler/handler')

const app = express();
const PORT = '3000';

app.use(express.json());

app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
});

// return response message
app.get('/', handler.pingHandler);

// return list of cars
app.get('/cars', handler.getListCarsHandler);

// return one car item
app.get('/cars/:id', handler.getCarHandler);

// return new car item
app.post('/cars', handler.createCarHandler);

// return updated car item
app.put('/cars/:id', handler.updateCarHandler);

// return deleted cars item
app.delete('/cars/:id', handler.deleteCarHandler);

app.get('*', handler.noRouteHandler)
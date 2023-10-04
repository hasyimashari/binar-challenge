const express = require('express');
const handler = require('./handler/handler');

const app = express();
const PORT = '3000';

app.use(express.json());

app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
});

app.get('/', handler.getPing);
app.get('/cars', handler.getListCars);
app.get('/cars/:id', handler.getCar);
app.post('/cars', handler.createCar);
app.put('/cars/:id', handler.updateCar);
app.delete('/cars/:id', handler.deleteCar);

app.get('*', handler.notFound);
app.post('*', handler.notFound);
app.put('*', handler.notFound);
app.delete('*', handler.notFound);
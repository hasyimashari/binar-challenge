const express = require('express');

const app = express();
const PORT = '3000';

app.get('/', (req, res) => {
    res.status(200).send({ 'message' : "ping succesfully"});
});

app.get('/cars', (req, res) => {
    res.status(200).send({ 'array' : "cars"});
});

app.get('/cars/:id', (req, res) => {

    const idCar = req.params;
    console.log(idCar)

    res.status(200).send({ 'item' : `car ${idCar['id']}`});
});

app.use(express.json());

app.post('/cars', (req, res) => {

    const body = req.body;
    console.log('body', body);

    res.status(200).send({ 'new item' : "new cars"});
});

app.put('/cars/:id', (req, res) => {

    const idCar = req.params;
    console.log(idCar)

    const body = req.body;
    console.log('body', body);

    res.status(200).send({ 'item' : "item updated"});
});

app.delete('/cars/:id', (req, res) => {

    const idCar = req.params;
    console.log(idCar)

    res.status(200).send({ 'item' : "item deleted"});
});

app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
})
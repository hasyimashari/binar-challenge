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

app.post('/new-car', (req, res) => {
    const params = req.body;
    console.log('params', params);
    res.status(200).send({ 'new item' : "new cars"});
});

app.put('/update-car', (req, res) => {
    const params = req.body;
    console.log('params', params);
    res.status(200).send({ 'item' : "item updated"});
});

app.delete('/delete-car', (req, res) => {
    res.status(200).send({ 'item' : "item deleted"});
});



app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
})
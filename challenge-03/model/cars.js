const cars = require('../databases/cars.json');
const {randomUUID} = require('crypto');

class Car {

    static #listCars = cars.map( ({plate, manufacture, model, transmission, available, type, year, options, specs, ...rest}) => rest);

    constructor (params) {
        this.id = this.#generate_uid();
        this.image = params.image;
        this.rentPerDay = params.rentPerDay;
        this.capacity = params.capacity;
        this.description = params.description;
        this.availableAt = params.availableAt;
    };

    #generate_uid () {
        const uid = randomUUID();
        return uid;
    };

    static getListCars () {
        return this.#listCars;
    };

    static getCar (id) {
        const car = this.#listCars.find( (i) => i.id == id);
        return car;
    };

    static createCar (params) {
        const car = new Car(params);
        this.#listCars.push(car);

        return car;
    };

    static updateCar (id, params) {

        const indexUpdatedCar = this.#listCars.findIndex( (i) => i.id == id);

        const updatedCarData = {
            id: id,
            ...params
        };

        this.#listCars[indexUpdatedCar] = updatedCarData;

        return updatedCarData;
    };

    static deleteCar (id) {
        const deleletedCar = this.getCar(id);

        const car = this.#listCars.filter( (i) => i.id != id);
        this.#listCars = car;

        return deleletedCar;
    }
};

module.exports = Car;
const { car } = require('../models');

const findAllCar = () => {
    return car.findAll();
}

const findCarById = (id) => {
    return car.findByPk(id);
};

const createCar = (payload) => {
    return car.create(payload);
};

const updateCar = (newData, id) => {
    return car.update(
        newData, 
        { where: { id }, 
        returning: true 
    });
};

const deleteCar = (id) => {
    return car.destroy({ 
        where: { id } 
    });
};

module.exports = {
    findAllCar,
    findCarById,
    createCar,
    updateCar,
    deleteCar
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('cars', [
      {
        "name": "BMW M5",
        "type": "medium",
        "image": "./images/car04.min.jpg",
        "rentPerDay": 900000,
        "capacity": 6,
        "description": " 6.1L SRT V8 \"Hemi\" engine.",
        "availableAt": "2022-03-23T15:49:05.563Z",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }, 
      {
        "name": "BMW X5",
        "type": "medium",
        "image": "./images/car02.min.jpg",
        "rentPerDay": 800000,
        "capacity": 6,
        "description": " Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
        "availableAt": "2022-03-23T15:49:05.563Z",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }, 
      {
        "name": "Lincoln MKZ",
        "type": "medium", 
        "image": "./images/car03.min.jpg",
        "rentPerDay": 900000,
        "capacity": 6,
        "description": " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
        "availableAt": "2022-03-23T15:49:05.563Z",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('cars', null, {})
  }
};

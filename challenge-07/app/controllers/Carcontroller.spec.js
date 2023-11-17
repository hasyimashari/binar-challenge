const CarController = require('./CarController')

const carModel = require('../models/car')
const userCarModel = require('../models/usercar')

const mockDayJs = {

}

const carController = new CarController(carModel, userCarModel, mockDayJs)

describe('CarControllerTest', () => {
  describe('#handleGetCar', () => {
    it('Should return cars', () => {
      const mockRequest = {
        params: {
          id: 1
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }
    })
  })
})

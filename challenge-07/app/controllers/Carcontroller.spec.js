const CarController = require('./CarController')

const mockCarModel = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  count: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn()
}
const mockUserCarModel = {
  create: jest.fn(),
  findOne: jest.fn()
}
const mockDayjs = jest.fn()

const carController = new CarController({
  carModel: mockCarModel,
  userCarModel: mockUserCarModel,
  dayjs: mockDayjs
})

describe('CarController', () => {
  describe('#getCarFromRequest', () => {
    it('Should return car data by id', () => {
      const mockCarData = {
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }

      const mockRequest = {
        params: {
          id: 1
        }
      }

      mockCarModel.findByPk.mockReturnValue(mockCarData)
      const returnedCarData = carController.getCarFromRequest(mockRequest)

      expect(returnedCarData).toStrictEqual(mockCarData)
    })
  })

  describe('#getListQueryFromRequest', () => {
    it('Should return list query', () => {
      const mockRequest = {
        query: {
          size: 10,
          pageSize: 10,
          availableAt: new Date()
        }
      }

      carController.getOffsetFromRequest = jest.fn().mockReturnValue(0)

      const listOfquery = carController.getListQueryFromRequest(mockRequest)

      expect(listOfquery).toStrictEqual({
        include: {
          as: 'userCar',
          model: mockUserCarModel,
          required: false
        },
        limit: 10,
        offset: 0,
        where: {}
      })
    })
  })

  describe('#hanldeListcars', () => {
    it('Shoul return cars data and meta', async () => {
      const mockListOfCars = [{
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }]

      const mockRequest = {}

      carController.getListQueryFromRequest = jest.fn().mockReturnValue({
        include: {
          as: 'userCar',
          model: mockUserCarModel,
          required: false
        },
        limit: 10,
        offset: 0,
        where: {}
      })

      mockCarModel.findAll.mockReturnValue(mockListOfCars)

      mockCarModel.count.mockReturnValue(1)

      carController.buildPaginationObject = jest.fn().mockReturnValue({
        page: 1,
        pageSize: 10,
        count: 10,
        pageCount: 1
      })

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await carController.handleListCars(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith({
        cars: mockListOfCars,
        meta: {
          pagination: {
            page: 1,
            pageSize: 10,
            count: 10,
            pageCount: 1
          }
        }
      })
    })
  })

  describe('#handleGetCar', () => {
    it('Should return the car from the request', async () => {
      const mockRequest = {}

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockCar = {
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }

      carController.getCarFromRequest = jest.fn().mockReturnValue(mockCar)

      await carController.handleGetCar(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar)
    })
  })

  describe('#handleCreateCar', () => {
    it('Should return new car data', async () => {
      const mockNewCarData = {
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }

      const mockRequest = {
        body: {
          name: 'mock car',
          price: 'mock car',
          size: 'mock car',
          image: 'mock car'
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      mockCarModel.create.mockReturnValue(mockNewCarData)

      await carController.handleCreateCar(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith(mockNewCarData)
    })

    it('Should return an error', async () => {
      const mockRequest = {
        body: { }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockError = new Error('data is required')
      mockError.name = 'ValidationError'

      mockCarModel.create.mockRejectedValue(mockError)

      await carController.handleCreateCar(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(422)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: 'ValidationError',
          message: 'data is required'
        }
      })
    })
  })

  describe('#handleRentCar', () => {
    it('Should return user car data', async () => {
      const mockCarData = {
        id: 1,
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }

      const mockUserCarData = {
        userId: 1,
        carId: 1,
        rentStartedAt: new Date(),
        rentEndedAt: new Date()
      }

      const mockNewUserCarData = {
        userId: 1,
        carId: 1,
        rentStartedAt: new Date(),
        rentEndedAt: new Date()
      }

      const mockRequest = {
        body: {
          rentStartedAt: new Date(),
          rentEndedAt: new Date()
        },
        user: {
          id: 1
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      carController.getCarFromRequest = jest.fn().mockReturnValue(mockCarData)

      mockUserCarModel.findOne.mockResolvedValue(mockUserCarData)
      mockUserCarModel.create.mockResolvedValue(mockNewUserCarData)

      await carController.handleRentCar(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith(mockNewUserCarData)
    })

    it('Should return an error', async () => {
      const mockCarData = {
        id: 1,
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }

      const mockRequest = {
        body: {
          rentStartedAt: new Date(),
          rentEndedAt: new Date()
        },
        user: {
          id: 1
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockError = new Error('mock car is already rented!!')

      carController.getCarFromRequest = jest.fn().mockReturnValue(mockCarData)

      mockUserCarModel.findOne.mockResolvedValue(null)

      await carController.handleRentCar(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(422)
      expect(mockResponse.json).toHaveBeenCalledWith(mockError)
    })
  })

  describe('#handleUpdateCar', () => {
    it('Should return updated car data', async () => {
      const mockCarData = {
        id: 1,
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }

      const mockUpdatedCarData = {
        id: 1,
        name: 'mock car updated',
        price: 'mock car updated',
        size: 'mock car updated',
        image: 'mock car updated'
      }

      const mockRequest = { }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      carController.getCarFromRequest = jest.fn().mockReturnValue(mockCarData)
      mockCarModel.update.mockReturnValue(mockUpdatedCarData)

      await carController.handleUpdateCar(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedCarData)
    })

    it('Should return an error', async () => {
      const mockCarData = {
        name: 'mock car',
        price: 'mock car',
        size: 'mock car',
        image: 'mock car'
      }

      const mockRequest = {
        body: { }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockError = new Error('data is required')
      mockError.name = 'ValidationError'

      carController.getCarFromRequest = jest.fn().mockReturnValue(mockCarData)
      mockCarModel.update.mockRejectedValue(mockError)

      await carController.handleUpdateCar(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(422)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: 'ValidationError',
          message: 'data is required'
        }
      })
    })
  })

  describe('#hadleDeleteCar', () => {
    it('Should return success delete car', async () => {
      const mockRequest = {
        params: {
          id: 1
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
      }

      mockCarModel.destroy.mockReturnValue()
      await carController.handleDeleteCar(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(204)
    })
  })
})

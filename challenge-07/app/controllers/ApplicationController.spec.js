const ApplicationController = require('./ApplicationController')
const applicationController = new ApplicationController()

describe('ApplicationController', () => {
  describe('#handleGetRoot', () => {
    it('Should return success to connect', () => {
      const mockRequest = {

      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      applicationController.handleGetRoot(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'OK',
        message: 'BCR API is up and running!'
      })
    })
  })

  describe('#handleNotFound', () => {
    it('Should return not found', () => {
      const mockRequest = {
        method: 'get',
        url: '/mock/url'
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      applicationController.handleNotFound(mockRequest, mockResponse)
      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: 'Error',
          message: 'Not found!',
          details: {
            method: 'get',
            url: '/mock/url'
          }
        }
      })
    })
  })

  describe('#handleError', () => {
    it('Should return error', () => {
      const mockError = {
        name: 'mock error',
        message: 'mock error',
        details: 'mock error'
      }

      const mockRequest = {

      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockNext = {

      }

      applicationController.handleError(mockError, mockRequest, mockResponse, mockNext)
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: mockError
      })
    })
  })

  describe('#getOffsetFromRequest', () => {
    it('Should return offset', () => {
      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10
        }
      }

      const offset = applicationController.getOffsetFromRequest(mockRequest)

      expect(offset).toBe(0)
    })
  })

  describe('#buildPaginationObject', () => {
    it('Should return pagination object', () => {
      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10
        }
      }

      const mockCount = 10

      const objePagination = applicationController.buildPaginationObject(mockRequest, mockCount)
      expect(objePagination).toStrictEqual({
        page: 1,
        pageSize: 10,
        count: 10,
        pageCount: 1
      })
    })
  })
})

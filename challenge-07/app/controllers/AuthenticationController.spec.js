const AuthenticationController = require('./AuthenticationController')

const mockUserModel = {
  findOne: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn()
}
const mockRoleModel = {
  findOne: jest.fn(),
  findByPk: jest.fn()
}
const mockBcrypt = {
  hashSync: jest.fn(),
  compareSync: jest.fn()
}
const mockJwt = {
  sign: jest.fn(),
  verify: jest.fn()
}

const autheticationController = new AuthenticationController({
  userModel: mockUserModel,
  roleModel: mockRoleModel,
  bcrypt: mockBcrypt,
  jwt: mockJwt
})

describe('AutheticationController', () => {
  describe('#createTokenFromUser', () => {
    it('Should return token from user payload', () => {
      const mockUser = {
        id: 1,
        name: 'mock user',
        email: 'mock user',
        image: 'mock user'
      }

      const mockRole = {
        id: 1,
        name: 'CUSTOMER'
      }

      const mockJwtoken = 'mockToken'

      mockJwt.sign.mockReturnValue(mockJwtoken)

      const returnedToken = autheticationController.createTokenFromUser(mockUser, mockRole)

      expect(returnedToken).toStrictEqual(mockJwtoken)
    })
  })

  describe('#decodeToken', () => {
    it('Should return decoded payload from token', () => {
      const mockJwtoken = 'mockToken'

      const mockUserPayload = {
        id: 1,
        name: 'mock user',
        email: 'mock user',
        image: 'mock user',
        role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      mockJwt.verify.mockReturnValue(mockUserPayload)

      const decodedPayload = autheticationController.decodeToken(mockJwtoken)

      expect(decodedPayload).toStrictEqual(mockUserPayload)
    })
  })

  describe('#encryptPassword', () => {
    it('Should return encrypted password', () => {
      const mockPassword = 'mock password'

      const mockEncryptedPassword = 'mock encrypted password'

      mockBcrypt.hashSync.mockReturnValue(mockEncryptedPassword)

      const returnedEncryptPassword = autheticationController.encryptPassword(mockPassword)

      expect(returnedEncryptPassword).toStrictEqual(mockEncryptedPassword)
    })
  })

  describe('#verifyPassword', () => {
    const mockEncryptedPassword = 'mock encrypted password'

    const mockCondition = true

    mockBcrypt.compareSync.mockReturnValue(mockCondition)

    const verifyedPassword = autheticationController.verifyPassword(mockEncryptedPassword)

    expect(verifyedPassword).toStrictEqual(mockCondition)
  })

  describe('#authorization', () => {
    it('Should return user payload from role admin', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer mockToken'
        },
        user: jest.fn().mockReturnThis()
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUserPayload = {
        role: {
          name: 'ADMIN'
        }
      }

      autheticationController.decodeToken = jest.fn().mockReturnValue(mockUserPayload)

      autheticationController.authorize('ADMIN')(mockRequest, mockResponse, jest.fn())

      expect(mockRequest.user).toStrictEqual(mockUserPayload)
    })

    it('Should return an error from role customer', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer mockToken'
        },
        user: jest.fn().mockReturnThis()
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUserPayload = {
        role: {
          name: 'CUSTOMER'
        }
      }

      autheticationController.decodeToken = jest.fn().mockReturnValue(mockUserPayload)

      autheticationController.authorize('ADMIN')(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(401)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: 'Error',
          message: 'Access forbidden!',
          details: {
            role: 'CUSTOMER',
            reason: 'CUSTOMER is not allowed to perform this operation.'
          }
        }
      })
    })
  })

  describe('#handleLogin', () => {
    it('Should return access token', async () => {
      const mockRequest = {
        body: {
          email: 'mock email',
          password: 'mock password'
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUserPayload = {
        id: 1,
        name: 'mock user',
        email: 'mock email',
        encryptedPassword: 'mock encrypted password',
        image: 'mock user',
        Role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      const mockJwtoken = 'mockJwtoken'

      mockUserModel.findOne.mockReturnValue(mockUserPayload)

      autheticationController.verifyPassword = jest.fn().mockReturnValue(true)

      autheticationController.createTokenFromUser = jest.fn().mockReturnValue(mockJwtoken)

      await autheticationController.handleLogin(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: mockJwtoken
      })
    })

    it('Should return email not registered error', async () => {
      const mockRequest = {
        body: {
          email: 'mock email',
          password: 'mock password'
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      mockUserModel.findOne.mockReturnValue()

      const mockError = new Error('mock email is not registered!')

      await autheticationController.handleLogin(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.json).toHaveBeenCalledWith(mockError)
    })

    it('Should return wrong password error', async () => {
      const mockRequest = {
        body: {
          email: 'mock email',
          password: 'mock password'
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUserPayload = {
        id: 1,
        name: 'mock user',
        email: 'mock email',
        encryptedPassword: 'mock encrypted password',
        image: 'mock user',
        Role: {
          id: 1,
          name: 'CUSTOMER'
        }
      }

      mockUserModel.findOne.mockReturnValue(mockUserPayload)

      autheticationController.verifyPassword = jest.fn().mockReturnValue(false)

      const mockError = new Error('Password is not correct!')

      await autheticationController.handleLogin(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(401)
      expect(mockResponse.json).toHaveBeenCalledWith(mockError)
    })
  })

  describe('#handleRegister', () => {
    it('Should return access token from new user', async () => {
      const mockRequest = {
        body: {
          name: 'mock user',
          email: 'mock user',
          password: 'mock user'
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockNewUserPayload = {
        name: 'mock user',
        email: 'mock user',
        encryptedPassword: 'mock user',
        roleId: 1
      }

      const mockRolePayload = {
        id: 1,
        name: 'CUSTOMER'
      }

      const mockJwtoken = 'mockJwtoken'

      mockUserModel.findOne.mockReturnValue()

      mockRoleModel.findOne.mockReturnValue(mockRolePayload)

      autheticationController.encryptPassword = jest.fn().mockReturnValue('mock encrypted password')

      mockUserModel.create.mockReturnValue(mockNewUserPayload)

      autheticationController.createTokenFromUser = jest.fn().mockReturnValue(mockJwtoken)

      await autheticationController.handleRegister(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: mockJwtoken
      })
    })

    it('Should return email already taken error', async () => {
      const mockRequest = {
        body: {
          name: 'mock user',
          email: 'mock email',
          password: 'mock user'
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUserPayload = {
        name: 'mock user',
        email: 'mock user',
        encryptedPassword: 'mock user',
        roleId: 1
      }

      const mockError = new Error('mock email is already taken!')

      mockUserModel.findOne.mockReturnValue(mockUserPayload)

      await autheticationController.handleRegister(mockRequest, mockResponse, jest.fn())

      expect(mockResponse.status).toHaveBeenCalledWith(422)
      expect(mockResponse.json).toHaveBeenCalledWith(mockError)
    })
  })

  describe('#handleGetUser', () => {
    it('Should return data from existing user', async () => {
      const mockRequest = {
        user: {
          id: 1
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUserPayload = {
        name: 'mock user',
        email: 'mock user',
        encryptedPassword: 'mock user',
        roleId: 1
      }

      const mockRolePayload = {
        id: 1,
        name: 'CUSTOMER'
      }

      mockUserModel.findByPk.mockReturnValue(mockUserPayload)

      mockRoleModel.findByPk.mockReturnValue(mockRolePayload)

      await autheticationController.handleGetUser(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(mockUserPayload)
    })

    it('Should return record user not found error', async () => {
      const mockRequest = {
        user: {
          id: 1
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      mockUserModel.findByPk.mockReturnValue()

      const mockError = new Error('1 not found!')

      await autheticationController.handleGetUser(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.json).toHaveBeenCalledWith(mockError)
    })

    it('Should return record role not found', async () => {
      const mockRequest = {
        user: {
          id: 1
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUserPayload = {
        name: 'mock user',
        email: 'mock user',
        encryptedPassword: 'mock user',
        roleId: 0
      }

      mockUserModel.findByPk.mockReturnValue(mockUserPayload)

      mockRoleModel.findByPk.mockReturnValue()

      const mockError = new Error('0 not found!')

      await autheticationController.handleGetUser(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.json).toHaveBeenCalledWith(mockError)
    })
  })
})

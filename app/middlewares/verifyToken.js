const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const ServerReply = require('../utils/ServerReply.js')
const showDevError = require('./../utils/showDevError.js')
const UserNotExistException = require('./../helpers/exceptions/UserNotExistException.js')
const AuthorizationHeaderMissingException = require('./../helpers/exceptions/AuthorizationHeaderMissingException.js')

const secretKey = 'your_secret_key'

const jwtMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  const runner = new ServerReply(res)
  
  if (!authorizationHeader) {
        throw new AuthorizationHeaderMissingException('Authorization header missing')
  }

  try {
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, secretKey)

    const user = await Users.findByPk(decoded.id)

    if (!user) {
        throw new UserNotExistException('User not found')
    }

    req.user = { id: user.id }

    next()
  } catch (error) {
    
    showDevError(error)
    return  error.constructor.name === 'AuthorizationHeaderMissinException' ?
            runner.sendError(400, error.message) :
            error.constructor.name === 'UserNotExistException' ?
            runner.sendError(400, error.message) :
            error.constructor.name === 'NotValidPasswordException' ?
            runner.sendError(400, error.message) :
            runner.sendError(400, 'Invalid Token. Please, log in and use the token given.')
  }
}

module.exports = jwtMiddleware

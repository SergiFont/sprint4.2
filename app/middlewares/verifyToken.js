const jwt = require('jsonwebtoken')
require('dotenv').config()
const { Users } = require('../models')
const ServerReply = require('../helpers/ServerReply.js')
const showDevError = require('./../helpers/showDevError.js')
const UserNotExistException = require('./../helpers/exceptions/UserNotExistException.js')
const AuthorizationHeaderMissingException = require('./../helpers/exceptions/AuthorizationHeaderMissingException.js')


const verifyToken = async (req, res, next) => {
  // const secretKey = 'your_secret_key'
  const secretKey = process.env.TOKEN_KEY
  const authorizationHeader = req.headers.authorization
  const runner = new ServerReply(res)
  
  
  try {
    if (!authorizationHeader) {
          throw new AuthorizationHeaderMissingException('Authorization header missing')
    }
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

module.exports = verifyToken

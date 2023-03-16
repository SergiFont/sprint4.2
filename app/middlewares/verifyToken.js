const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const { ServerReply } = require('../utils/ServerReply.js')

const secretKey = 'your_secret_key'

const jwtMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  const runner = new ServerReply(res)

  if (!authorizationHeader) {
        return runner.sendError(401, 'Authorization header missing')
  }

  try {
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, secretKey)

    const user = await Users.findByPk(decoded.id)

    if (!user) {
        return runner.sendError(401, 'User not found')
    }

    req.user = { id: user.id }

    next()
  } catch (error) {
    return runner.sendError(401, 'Please, log in')
  }
}

module.exports = jwtMiddleware

const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const { sendError } = require('../utils/serverReplys.js')

const secretKey = 'your_secret_key'

const jwtMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
        return sendError(res, 401, 'Authorization header missing')
  }

  try {
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, secretKey)

    const user = await Users.findByPk(decoded.id)

    if (!user) {
        return sendError(res, 401, 'User not found')
    }

    req.user = { id: user.id }

    next()
  } catch (error) {
    return sendError(res, 401, 'Invalid token')
  }
}

module.exports = jwtMiddleware

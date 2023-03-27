const ServerReply = require('../helpers/ServerReply.js')

const validateCredentials = (req, res, next) => {
    const { user, password } = req.body
  
    if (!user || !password) {
        const runner = new ServerReply(res)
        return runner.sendError(400, 'User or password keys are invalid')
    }
    next()
}

module.exports = validateCredentials
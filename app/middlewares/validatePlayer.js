const ServerReply = require('../helpers/ServerReply.js')

const validatePlayer = (req, res, next) => {
    const { username } = req.body
  
    if (!username) {
        const runner = new ServerReply(res)
        return runner.sendError(400, 'username key is invalid')
    }
    next()
}

module.exports = validatePlayer
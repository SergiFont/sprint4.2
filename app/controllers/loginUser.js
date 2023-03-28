const ServerReply = require('../helpers/ServerReply.js')
const Username = require('../entities/Username.js')
const UserNotExistException = require('../helpers/exceptions/UserNotExistException.js')
const NotMatchingPasswordException = require('../helpers/exceptions/NotMatchingPasswordException.js')
const Token = require('../entities/Token.js')
const showDevError = require('../helpers/showDevError.js')
const { users } = require('./../entities/repositories/choosenDb.js')

exports.loginUser = async (req, res) => {
    
    try {
        const { user } = req.body
        const { password } = req.body
        const runner = new ServerReply(res)

        new Username(user)
        const userExist = await users.findByName(user)
        if (!userExist) throw new UserNotExistException('Username does not exist')

        const passwordIsValid = await userExist.verifyPassword(password)
        if (!passwordIsValid) throw new NotMatchingPasswordException('Password does not match')
        
        const token = new Token(userExist.id)
        const userToken = token.getToken()

        const role =
        userExist.role === 0 ? 'ADMIN' :
        userExist.role === 1 ? 'PLAYER':
        'GUEST'
        runner.sendResponse(200, { token: userToken, message: `Welcome Back, ${user}`, role: `user level: ${role}` })

    } catch (error) {
        const runner = new ServerReply(res)
        const errorType = error.constructor.name
        showDevError(error)
        return  errorType === 'NotValidUsernameException' || 
                errorType === 'UserNotExistException' || 
                errorType === 'NotMatchingPasswordException' ?
                runner.sendError(400, error.message) :
                runner.sendError(500, 'Server error')
    }
}

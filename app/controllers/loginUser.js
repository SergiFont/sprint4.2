const ServerReply = require('../helpers/ServerReply.js')
const Username = require('../entities/Username.js')
const UserNotExistException = require('../helpers/exceptions/UserNotExistException.js')
const NotMatchingPasswordException = require('../helpers/exceptions/NotMatchingPasswordException.js')
const Token = require('../entities/Token.js')
const showDevError = require('../helpers/showDevError.js')
const UsersRepositoryMysql = require('../entities/repositories/users/UsersRepositoryMysql.js')

exports.loginUser = async (req, res) => {
    
    try {
        const { user } = req.body
        const { password } = req.body
        const runner = new ServerReply(res)
        const users = new UsersRepositoryMysql()

        new Username(user)
        const userExist = await users.findByName(user)
        if (!userExist) throw new UserNotExistException('Username does not exist')

        const passwordIsValid = await userExist.verifyPassword(password) // esto habrá que modificarlo para ser mas general,
        // en caso de usar otra base de datos distinta como Mongo.
        if (!passwordIsValid) throw new NotMatchingPasswordException('Password does not match')
        
        const token = new Token(userExist.id)
        const userToken = token.getToken()

        let role
        userExist.role === 0 ? role = 'ADMIN' :
        userExist.role === 1 ? role = 'PLAYER':
        role = 'GUEST'
        runner.sendResponse(200, { token: userToken, message: `Welcome Back, ${user}`, role: `user level: ${role}` })

    } catch (error) {
        const runner = new ServerReply(res)
        showDevError(error)
        return  error.constructor.name === 'NotValidUsernameException' ?
                runner.sendError(400, error.message) :
                error.constructor.name === 'UserNotExistException' ?
                runner.sendError(400, error.message) :
                error.constructor.name === 'NotMatchingPasswordException' ?
                runner.sendError(400, error.message) :
                runner.sendError(500, 'Server error')
    }
}

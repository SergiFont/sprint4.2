const { Users } = require('../models')
const ServerReply = require('../utils/ServerReply.js')
const Username = require('./../helpers/Username.js')
const UserNotExistException = require('./../helpers/exceptions/UserNotExistException.js')
const NotMatchingPasswordException = require('./../helpers/exceptions/NotMatchingPasswordException.js')
const Token = require('./../helpers/Token.js')

exports.loginUser = async (req, res) => {
    const { user } = req.body
    const { password } = req.body
    const runner = new ServerReply(res)

    try {
        new Username(user)
        const userExist = await Users.findOne({where: {user}})
        if (!userExist) throw new UserNotExistException('Username does not exist')

        const passwordIsValid = await userExist.verifyPassword(password)
        if (!passwordIsValid) throw new NotMatchingPasswordException('Password does not match')
        
        const token = new Token(userExist.id)
        const userToken = token.getToken()

        let role
        userExist.role === 0 ? role = 'ADMIN' :
        userExist.role === 1 ? role = 'PLAYER':
        role = 'GUEST'
        runner.sendResponse(200, { token: userToken, message: `Welcome Back, ${user}`, role: `user level: ${role}` })

    } catch (error) {
        const report = runner.sendError(400, error.message)
        console.log(error)
        return  error.constructor.name === 'NotValidUsernameException' ?
                report :
                error.constructor.name === 'UserNotExistException' ?
                report :
                error.constructor.name === 'NotMatchingPasswordException' ?
                report :
                runner.sendError(500, 'Server error')
    }
}

const ServerReply = require('../helpers/ServerReply.js')
const Username = require('../entities/Username.js')
const Password = require('../entities/Password.js')
const UserExistException = require('../helpers/exceptions/UserExistException.js')
const showDevError = require('../helpers/showDevError.js')
const UsersRepositoryMysql = require('../entities/repositories/users/UsersRepositoryMysql.js')

exports.createUser = async (req, res) => {
    
    try {
        const { user, password } = req.body
        const runner = new ServerReply(res)
        const users = new UsersRepositoryMysql()
        const username = new Username(user)
        
        const userExist = await users.findByName(username.getUsername())
        if (userExist) throw new UserExistException('User name already used')

        const pass = new Password()
        await pass.cryptPassword(password)
        const securedPassword = pass.getPassword()

        users.createUser(user, securedPassword)
        runner.sendResponse(200, 'User created succesfully')

    } catch (error) {
        const runner = new ServerReply(res)
        showDevError(error)
        return  error.constructor.name === 'NotValidUsernameException' ?
                runner.sendError(400, error.message) :
                error.constructor.name === 'UserExistException' ?
                runner.sendError(400, error.message) :
                error.constructor.name === 'NotValidPasswordException' ?
                runner.sendError(400, error.message) :
                runner.sendError(500, 'Server error')
    }
}
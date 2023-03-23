// const { Users } = require('../models')
const ServerReply = require('../utils/ServerReply.js')
const Username = require('./../helpers/Username.js')
const Password = require('./../helpers/Password.js')
const UserExistException = require('./../helpers/exceptions/UserExistException.js')
const showDevError = require('./../utils/showDevError.js')
const UsersRepositoryMysql = require('./../class/users/UsersRepositoryMysql.js')

exports.createUser = async (req, res) => {
    
    try {
        const { user } = req.body
        const { password } = req.body
        // aqui se validaria user y password
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
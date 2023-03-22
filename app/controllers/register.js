const { Users } = require('../models');
const ServerReply = require('../utils/ServerReply.js')
const Username = require('./../helpers/Username.js')
const Password = require('./../helpers/Password.js')
const UserExistException = require('./../helpers/exceptions/UserExistException.js')

exports.createUser = async (req, res) => {
    const { user } = req.body
    const { password } = req.body
    // aqui se validaria user y password
    const runner = new ServerReply(res)

    try {
        const username = new Username(user)
        const userExist = await Users.findOne({ where: { user: username.getUsername() } })
        if (userExist) throw new UserExistException('User name already used')

        const pass = new Password()
        await pass.cryptPassword(password)
        const securedPassword = pass.getPassword()

        await Users.create({ user, password: securedPassword })
        runner.sendResponse(200, 'User created succesfully')

    } catch (error) {
        const report = runner.sendError(400, error.message)
        console.log(error)
        return  error.constructor.name === 'NotValidUsernameException' ?
                report :
                error.constructor.name === 'UserExistException' ?
                report :
                error.constructor.name === 'NotValidPasswordException' ?
                report :
                runner.sendError(500, 'Server error')
    }
}
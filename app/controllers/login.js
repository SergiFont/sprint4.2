const { Users } = require('../models')
const { ServerReply } = require('../utils/ServerReply.js')
const jwt = require('jsonwebtoken')
const { Validator } = require('../helpers/Validator.js')


exports.loginUser = async (req, res) => {
    const runner = new ServerReply(res)
    const check = new Validator()
    const { user } = req.body
    const { password } = req.body
    try {
        if (check.emptyUsername(user)) return runner.sendError(400, 'Enter a username please')
        const userExist = await check.userNameTaken(user)
        if (!userExist) return runner.sendError(404, 'Username does not exist')
        const passwordIsValid = await userExist.verifyPassword(password)
        if (!passwordIsValid) return runner.sendError(401, 'Password does not match')

        const secretKey = 'your_secret_key'

        const payload = {
            id: userExist.id,
        };
        let role
        userExist.role === 0 ? role = 'ADMIN' :
        userExist.role === 1 ? role = 'PLAYER':
        role = 'GUEST'

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

        runner.sendResponse(200, { token, message: `Welcome Back, ${user}`, role: `user level: ${role}` })

    } catch (error) {
        console.log(error)
        runner.sendError(500, 'Server error')
    }
}

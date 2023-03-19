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
        const userExist = await Users.findOne({
            where: {
                user
            }
        })
        if (!userExist) return runner.sendError(404, 'Invalid user name')
        const passwordIsValid = await userExist.verifyPassword(password)
        if (!passwordIsValid) return runner.sendError(401, 'Password does not match')

        const secretKey = 'your_secret_key'

        const payload = {
            id: userExist.id
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

        runner.sendResponse(200, { token, message: `Welcome Back, ${user}` })

    } catch (error) {
        console.log(error)
        runner.sendError(500, 'Server error')
    }
}

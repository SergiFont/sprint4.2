const { Users } = require('../models')
const { sendError, sendResponse } = require('../utils/serverReplys.js')
const jwt = require('jsonwebtoken')


exports.loginUser = async (req, res) => {
    const { user } = req.body
    const { password } = req.body
    try {
        if (user.trim() === "") return sendError(res, 400, 'Enter a username please')
        const userExist = await Users.findOne({
            where: {
                user
            }
        })
        console.log(userExist.id)
        if (!userExist) return sendError(res, 404, 'Invalid user name')
        const passwordIsValid = await userExist.verifyPassword(password)
        if (!passwordIsValid) return sendError(res, 401, 'Password does not match')

        const secretKey = 'your_secret_key'

        const payload = {
            id: userExist.id,
            username: user
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

        sendResponse(res, 200, { token: token, message: `Welcome Back, ${user}` })

    } catch (error) {
        sendError(res, 500, error)
    }
}

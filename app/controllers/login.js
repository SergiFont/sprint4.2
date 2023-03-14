const { Users } = require('../models')
const {sendError, sendResponse} = require('../utils/serverReplys.js')


exports.loginUser = async (req, res) => {
    const {user} = req.body
    const {password} = req.body
    try {
        if(user.trim() === "") return sendError(res, 400, 'Enter a username please')
        const userExist = await Users.findOne({
            where: {
                user
            }
        })
        if (!userExist) return sendError(res, 404, 'Invalid user name')
        const passwordIsValid = await userExist.verifyPassword(password);
        console.log(passwordIsValid)
        if (!passwordIsValid) return sendError(res, 401, 'Password does not match')
      
        sendResponse(res, 200, `Welcome Back, ${user}`)
        
    } catch (error) {
        sendError(res, 500, error)
    }
}
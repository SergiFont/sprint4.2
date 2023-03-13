const { Users } = require('../models');
const {sendError, sendResponse} = require('../utils/serverReplys.js')

exports.createUser = async (req, res) => {
    const {user} = req.body
    const {password} = req.body
    try {
        if (user.indexOf(' ') !== -1) return sendError(res, 400, 'User name cannot contain white spaces')
        if(user.trim() === "") return sendError(res, 400, 'Invalid user name')
        await Users.create({user, password})
        sendResponse(res, 200, 'User created succesfully')
        
    } catch (error) {
        sendError(res, 500, 'Server error')
    }
}
const { Users } = require('../models');
const {sendError, sendResponse} = require('../utils/serverReplys.js')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    const {user} = req.body
    let {password} = req.body
    password = await bcrypt.hash(password, 10)
    try {
        if (user.indexOf(' ') !== -1) return sendError(res, 400, 'User name cannot contain white spaces')
        if(user.trim() === "") return sendError(res, 400, 'Invalid user name')
        await Users.create({user, password})
        sendResponse(res, 200, 'User created succesfully')
        
    } catch (error) {
        sendError(res, 500, 'Server error')
    }
}
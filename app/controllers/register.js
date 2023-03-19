const { Users } = require('../models');
const {ServerReply} = require('../utils/ServerReply.js')
const {Validator} = require('../helpers/Validator.js')
const {Password} = require('./../helpers/Password.js')

exports.createUser = async (req, res) => {
    const check = new Validator()
    const runner = new ServerReply(res)
    const p = new Password()
    const {user} = req.body
    let {password} = req.body
    try {
        const validUser = check.isValid(user)
        if (validUser !== true) return runner.sendError(400, validUser)
        const wantedName = await check.userNameTaken(user)
        if(wantedName) return runner.sendError(400, 'User name already used.')
        password = await p.storePassword(password)
        await Users.create({user, password})
        runner.sendResponse(200, 'User created succesfully')
        
    } catch (error) {
        console.log(error)
        runner.sendError(500, 'Server error')
    }
}
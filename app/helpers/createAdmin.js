const { Users } = require('../models')
const { Validator } = require('./../helpers/Validator.js')
const CrypterService = require('./../helpers/CrypterService.js')

const createAdmin = async () => {
    const check = new Validator()
    const crypterService = new CrypterService()
    const admin = await check.userNameTaken('admin')
    if (!admin) {
        const password = await crypterService.generateCrypt('admin')
        await Users.create({
            user: 'admin',
            password,
            role: 0
        })
    }
}

module.exports = createAdmin
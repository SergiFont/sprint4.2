const { Users } = require('../models')
const CrypterService = require('./../helpers/CrypterService.js')

const createAdmin = async () => {
    const crypterService = new CrypterService()
    const admin = await Users.findOne({where: {user: 'admin'}})
    if (!admin) {
        const password = await crypterService.generateCrypt('admin')
        await Users.create({user: 'admin', password, role: 0})
    }
}

module.exports = createAdmin
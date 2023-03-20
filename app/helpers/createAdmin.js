const { Users } = require('../models')
const { Validator } = require('./../helpers/Validator.js')
const { Password } = require('./../helpers/Password.js')

const createAdmin = async () => {
    const check = new Validator()
    const p = new Password()
    const admin = await check.userNameTaken('admin')
    if (!admin) {
        const password = await p.cryptPassword('admin')
        await Users.create({
            user: 'admin',
            password,
            role: 0
        })
    }
}

module.exports = { createAdmin }

// const admin = await Models.User.findOne({where: {name: 'Admin'}})
//         if(admin === null){
//             const adminPswd = await encrypt(chatAdminPswd)
//             await Models.User.create({name: 'Admin', password: adminPswd, level: 0})
//         }
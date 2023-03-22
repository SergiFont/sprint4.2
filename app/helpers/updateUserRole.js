const { Users } = require('../models')

const updateUserRole = async subject => {
    const user = await Users.findOne({where: {id: subject}})
    if (user.role === 1 || user.role === 0) return 
    user.role = 1
    await user.save()
}

module.exports = updateUserRole
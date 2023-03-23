const { Users } = require('../../models')

class UsersRepositoryMysql {
    async findByName(name) {
        return await Users.findOne({ where: { user: name } })
    }

    async createUser(username, password) {
        await Users.create({ user: username, password })
    }

    async updateUserRole(id) {
        const user = await Users.findOne({where: {id}})
        if (user.role === 1 || user.role === 0) return 
        user.role = 1
        await user.save()
    }
}

module.exports = UsersRepositoryMysql
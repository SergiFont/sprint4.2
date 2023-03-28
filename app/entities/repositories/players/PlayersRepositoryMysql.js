const { Players } = require('../../../models')

class PlayersRepositoryMysql {
    async findByName(name) {
        return await Players.findOne({ where: { username: name } })
    }

    async createPlayer(userId, username) {
        return await Players.create({ userId, username })
    }

    async findById(userId) {
        return await Players.findOne({where: {userId}})
    }

    async updatePlayerName(player, newName) {
        player.username = newName
        await player.save()
    }

    async findAllPlayers() {
        return await Players.findAll()
    }

    async findByPlayerId(id) {
        return await Players.findOne({where: {id}})
    }
}

module.exports = PlayersRepositoryMysql
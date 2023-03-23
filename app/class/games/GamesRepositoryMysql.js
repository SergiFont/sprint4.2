const { Games } = require('../../models')

class GamesRepositoryMysql {
    async findPlayerGames(playerId) {
        return await Games.findAll({where: {playerId}})
    }

    async createGame(dice1, dice2, victory, playerId) {
        return await Games.create({dice1, dice2, victory, playerId})
    }

    async deleteGames(playerId) {
        await Games.destroy({where: {playerId} })
    }
}

module.exports = GamesRepositoryMysql
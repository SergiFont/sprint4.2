const PlayersRepositoryMysql = require('./repositories/players/PlayersRepositoryMysql.js')
const GamesRepositoryMysql = require('./repositories/games/GamesRepositoryMysql.js')

class Ranking {

    async playerRanking(id) {
        const players = new PlayersRepositoryMysql()
        const games = new GamesRepositoryMysql()
        const player = await players.findByPlayerId(id)
        const playerName = player.username
        const playerGames = await games.findPlayerGames(player.id)
        let victoryList = []
        playerGames.forEach(element => {
            const victory = element.victory
            victory === true ? victoryList.push(victory) : null
        })
        const numberOfGames = playerGames.length
        const numberOfVictories = victoryList.length
        const percentatgeVictories = Number(((numberOfVictories/numberOfGames) * 100).toFixed(2))

        return { playerName, percentatgeVictories }
    }

    async generalRanking() {
        const players = new PlayersRepositoryMysql()
        const playerList = await players.findAllPlayers()
        const idList = playerList.map(player => player.id)

        const playerRankingPromises = idList.map(id => this.playerRanking(id))
        const playerRankingList = await Promise.all(playerRankingPromises)
        const ranking = []
        const percentatgeList = []
        playerRankingList.forEach(player => {
            if (!isNaN(player.percentatgeVictories)) {
                ranking.push(player)
                percentatgeList.push(player.percentatgeVictories)
            }

        })
        ranking.sort((a, b) => b.percentatgeVictories - a.percentatgeVictories)
        const average = (percentatgeList.reduce((total, value) => total + value, 0)) / percentatgeList.length
        
        return {ranking, average}
    }

    async bestPlayer() {
        const data = await this.generalRanking()
        const result = data.ranking[0]
        return result
    }

    async worstPlayer() {
        const data = await this.generalRanking()
        const result = (data.ranking.reverse())[0]
        return result
    }
}

module.exports = Ranking
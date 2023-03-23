const { Games } = require('../models'); // Import the Game model from Sequelize
const { Players } = require('../models');
const ServerReply = require('../utils/ServerReply.js')
const showDevError = require('./../utils/showDevError.js')

/*
GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.
 */

exports.getRanking = async (req, res) => {
    const runner = new ServerReply(res)
    try {
        const victoryPercentageAll = 
            await Games.findAll().then(games => {
            const numGames = games.length
            const numWins = games.reduce((sum, game) => sum + (game.victory ? 1 : 0), 0)
            const result = (numWins / numGames) * 100
            return result
          })
        const victoryPercenPerPlayer = 
            await Players.findAll().then(async players => {
                const results = []
                const playerNames = []
                for (const player of players) {
                    const playerId = player.id
                    const playerGames = await Games.findAll({
                        where: {
                            playerId
                        }
                    })
                    const numGames = playerGames.length
                    const numWins = playerGames.reduce((sum, game) => sum + (game.victory ? 1 : 0), 0)
                    const result = (numWins / numGames) *100
                    playerNames.push(player.username)
                    results.push(result)
                };
                return {results, playerNames}
            })
        const showResult = async () => {
            const players = await Players.findAll()
            const {results, playerNames} = await victoryPercenPerPlayer
            let result = ''
            for (let counter = 0 ; counter < players.length ; counter ++) {
                console.log(players.length)
                result += `${playerNames[counter]}: ${results[counter]}%` 
            }
            return result
        }
        console.log(await showResult())
        console.log(victoryPercenPerPlayer[0])
        res.json(200, {general_ranking:`Percentatge of wins for all the player base: ${victoryPercentageAll}%.`}, {player_ranking: `Percentatge of wins per player: ${await showResult()}`})
        
    } catch (error) {
        showDevError(error)
        runner.sendError(500, 'Server error')
    }
}
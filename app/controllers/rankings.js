const { Games } = require('../models'); // Import the Game model from Sequelize
const { Players } = require('../models');
const { ServerReply } = require('../utils/ServerReply.js')
const { Validator } = require('./../helpers/Validator.js')

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
                    results.push(result)
                };
                return results
            })
        console.log(victoryPercenPerPlayer)
        runner.sendResponse(200, `Percentatge of wins for all the player base: ${victoryPercentageAll}%`)
        
    } catch (error) {
        console.log(error)
        runner.sendError(500, 'Server error')
    }
}
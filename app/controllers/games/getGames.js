const PlayersRepositoryMysql = require('./../../entities/repositories/players/PlayersRepositoryMysql.js')
const GamesRepositoryMysql = require('./../../entities/repositories/games/GamesRepositoryMysql.js')
const ServerReply = require('../../helpers/ServerReply.js')
const showDevError = require('../../helpers/showDevError.js')
const NoGamesPlayedException = require('./../../helpers/exceptions/NoGamesPlayedException.js')

const getGames = async (req, res) => {
    try {
      const userId = req.user.id
      const runner = new ServerReply(res)
      const games = new GamesRepositoryMysql()
      const players = new PlayersRepositoryMysql()
      const player = await players.findById(userId)
      if (!player) throw new NoGamesPlayedException('No games played.')
  
      const gamesList = await games.findPlayerGames(player.id)
      if (!gamesList[0]) throw new NoGamesPlayedException('No games played.')
  
      runner.sendResponse(200, gamesList) // Return the games as JSON
  
    } catch (error) {
      const runner = new ServerReply(res)
      showDevError(error)
          return  error.constructor.name === 'NoGamesPlayedException' ?
                  runner.sendError(400, error.message) :
                  runner.sendError(500, 'Server error')
    }
  }

  module.exports = getGames
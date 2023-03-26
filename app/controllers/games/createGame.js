const ServerReply = require('../../helpers/ServerReply.js')
const Game = require('../../entities/Game.js')
const showDevError = require('../../helpers/showDevError.js')
const PlayersRepositoryMysql = require('./../../entities/repositories/players/PlayersRepositoryMysql.js')
const GamesRepositoryMysql = require('./../../entities/repositories/games/GamesRepositoryMysql.js')

const createGame = async (req, res) => {
    try {
      const userId = req.user.id
      const runner = new ServerReply(res)
      const games = new GamesRepositoryMysql()
      const players = new PlayersRepositoryMysql()
      const newGame = new Game()
      let userHasPlayer = await players.findById(userId)
      if (!userHasPlayer) {
        await players.createPlayer(userId, 'Anonymous')
        userHasPlayer = await players.findById(userId)
      } // checks if the user has a player. If not, creates an anonymous player.
  
      const {dice1, dice2, victory} = newGame.getGame()
      const playerId = userHasPlayer.id
      const game = await games.createGame(dice1, dice2, victory, playerId)
      runner.sendResponse(201, game); // Return the newly created game as JSON
    
    } catch (error) {
      const runner = new ServerReply(res)
      showDevError(error)
      runner.sendError(500, 'Server error') // Return an error response if something goes wrong
    }
  }

  module.exports = createGame
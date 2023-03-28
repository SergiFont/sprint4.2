const ServerReply = require('../../helpers/ServerReply.js')
const NoGamesPlayedException = require('./../../helpers/exceptions/NoGamesPlayedException.js')
const showDevError = require('../../helpers/showDevError.js')
const { players } = require('./../../entities/repositories/choosenDb.js')
const { games } = require('./../../entities/repositories/choosenDb.js')

const deleteGames = async (req, res) => {
    try {
      const userId = req.user.id
      const runner = new ServerReply(res)
  
      const player = await players.findById(userId)
  
      if (!player) throw new NoGamesPlayedException('No games played.')
  
      const gamesPlayed = await games.findPlayerGames(player.id)
      if (!gamesPlayed[0]) throw new NoGamesPlayedException('No games played.')
  
      await games.deleteGames(player.id)
      runner.sendResponse(200, 'Games deleted succesfully')
    } catch (error) {
      const runner = new ServerReply(res)
      showDevError(error)
      error.constructor.name === 'NoGamesPlayedException' ? runner.sendError(400, error.message) :
      runner.sendError(500, 'Server Error'); // Return an error response if something goes wrong
    }
  }

  module.exports = deleteGames
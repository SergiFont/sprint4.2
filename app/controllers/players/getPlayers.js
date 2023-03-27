const ServerReply = require('../../helpers/ServerReply.js')
const showDevError = require('./../../helpers/showDevError.js')
const { players } = require('./../../entities/repositories/choosenDb.js')

const getPlayers = async (req, res) => {
    try {
      const runner = new ServerReply(res)
      const playerList = await players.findAllPlayers()
      runner.sendResponse(200, playerList) // Return the games as JSON
    } catch (error) {
      const runner = new ServerReply(res)
      showDevError(error)
      runner.sendError(500, 'Server error')
    }
  }

  module.exports = getPlayers
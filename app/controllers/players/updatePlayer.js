const ServerReply = require('../../helpers/ServerReply.js')
const Player  = require('./../../entities/Player.js')
const PlayerNotExistException  = require('./../../helpers/exceptions/PlayerNotExistException.js')
const PlayerNameTakenException  = require('./../../helpers/exceptions/PlayerNameTakenException.js')
const showDevError = require('./../../helpers/showDevError.js')
const PlayersRepositoryMysql = require('./../../entities/repositories/players/PlayersRepositoryMysql.js')

const updatePlayer = async (req, res) => {
    try {
        const userId = req.user.id
        const {username} = req.query // accesing the value of the key newUsername in the body(x-www-form-urlencoded).
        const runner = new ServerReply(res)
        const newPlayerName = new Player(username)
        const players = new PlayersRepositoryMysql()

        const playerExist = await players.findById(userId)
        if (!playerExist) throw new PlayerNotExistException('You do not have a player created')

        const nameUsed = await players.findByName(newPlayerName.getName())
        if (nameUsed) throw new PlayerNameTakenException('Player name already being used.')

        await players.updatePlayerName(playerExist, newPlayerName.getName())
        runner.sendResponse(200, 'Username updated succesfully') // Return the games as JSON
        
    } catch (error) {
      const runner = new ServerReply(res)
      showDevError(error)
        return  error.constructor.name === 'NotValidUsernameException' ?
                runner.sendError(400, error.message) :
                error.constructor.name === 'PlayerNotExistException' ?
                runner.sendError(400, error.message) :
                error.constructor.name === 'PlayerNameTakenException' ?
                runner.sendError(400, error.message) :
                runner.sendError(500, 'Server error')
    }
  }

  module.exports = updatePlayer
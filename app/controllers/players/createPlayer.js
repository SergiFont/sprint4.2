const ServerReply = require('../../helpers/ServerReply.js')
const Player  = require('./../../entities/Player.js')
const UserAlreadyHasPlayerException  = require('./../../helpers/exceptions/UserAlreadyHasPlayerException.js')
const PlayerNameTakenException  = require('./../../helpers/exceptions/PlayerNameTakenException.js')
const showDevError = require('./../../helpers/showDevError.js')
const UsersRepositoryMysql = require('./../../entities/repositories/users/UsersRepositoryMysql.js')
const PlayersRepositoryMysql = require('./../../entities/repositories/players/PlayersRepositoryMysql.js')

const createPlayer = async (req, res) => {
  
  try {
      const userId = req.user.id
      const { username } = req.query
      const runner = new ServerReply(res)
      const users = new UsersRepositoryMysql()
      const players = new PlayersRepositoryMysql()
      const playerName = new Player(username)

      const userOwnPlayer = await players.findById(userId)
      if (userOwnPlayer && userOwnPlayer?.username !== 'Anonymous') throw new UserAlreadyHasPlayerException ('You already got a player. Only one player per user allowed.')
      const nameTaken = await players.findByName(playerName.getName())
      if (nameTaken) throw new PlayerNameTakenException('Name already in use.')
      
      users.updateUserRole(userId)
      if (userOwnPlayer?.username === 'Anonymous') {
        await players.updatePlayerName(userOwnPlayer, playerName.getName())
        return runner.sendResponse(201, userOwnPlayer)
      } else {
        const newPlayer = await players.createPlayer(userId, playerName.getName())
        runner.sendResponse(201, newPlayer); // Return the newly created game as JSON
      }
    } catch (error) {
      const runner = new ServerReply(res)
      showDevError(error)
      return  error.constructor.name === 'NotValidUsernameException' ?
              runner.sendError(400, error.message) :
              error.constructor.name === 'UserAlreadyHasPlayerException' ?
              runner.sendError(400, error.message) :
              error.constructor.name === 'PlayerNameTakenException' ?
              runner.sendError(400, error.message) :
              runner.sendError(500, 'Server error')
    }
  }

  module.exports = createPlayer
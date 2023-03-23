// const { Players } = require('../models');
const ServerReply  = require('../utils/ServerReply.js')
const Player  = require('./../helpers/Player.js')
const UserAlreadyHasPlayerException  = require('./../helpers/exceptions/UserAlreadyHasPlayerException.js')
const PlayerNotExistException  = require('./../helpers/exceptions/PlayerNotExistException.js')
const PlayerNameTakenException  = require('./../helpers/exceptions/PlayerNameTakenException.js')
const showDevError = require('./../utils/showDevError.js')
const UsersRepositoryMysql = require('./../class/users/UsersRepositoryMysql.js')
const PlayersRepositoryMysql = require('./../class/players/PlayersRepositoryMysql.js')

exports.createPlayer = async (req, res) => {
  
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
  };

  exports.getPlayers = async (req, res) => {
    try {
      const runner = new ServerReply(res)
      const players = new PlayersRepositoryMysql()
      // const playerList = await Players.findAll(); // Retrieve all players from the database using Sequelize
      const playerList = await players.findAllPlayers()
      runner.sendResponse(200, playerList) // Return the games as JSON
    } catch (error) {
      const runner = new ServerReply(res)
      showDevError(error)
      runner.sendError(500, 'Server error')
    }
  };

  exports.updatePlayer = async (req, res) => {
    try {
        const userId = req.user.id
        const {newName} = req.query // accesing the value of the key newUsername in the body(x-www-form-urlencoded).
        const runner = new ServerReply(res)
        const newPlayerName = new Player(newName)
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
  };
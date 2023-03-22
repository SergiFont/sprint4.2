const { Players } = require('../models');
const ServerReply  = require('../utils/ServerReply.js')
const Player  = require('./../helpers/Player.js')
const UserAlreadyHasPlayerException  = require('./../helpers/exceptions/UserAlreadyHasPlayerException.js')
const PlayerNotExistException  = require('./../helpers/exceptions/PlayerNotExistException.js')
const PlayerNameTakenException  = require('./../helpers/exceptions/PlayerNameTakenException.js')
const updateUserRole = require('./../helpers/updateUserRole.js')

exports.createPlayer = async (req, res) => {
    const userId = req.user.id
    const { username } = req.query
    const runner = new ServerReply(res)
    try {
      const player = new Player(username)
      const userOwnPlayer = await Players.findOne({where: {userId}})
      if (userOwnPlayer && userOwnPlayer?.username !== 'Anonymous') throw new UserAlreadyHasPlayerException ('You already got a player. Only one player per user allowed.')
      const nameTaken = await Players.findOne({where: {username: player.getName()}})
      if (nameTaken) throw new PlayerNameTakenException('Name already in use.')
      
      await updateUserRole(userId)
      if (userOwnPlayer?.username === 'Anonymous') {
        userOwnPlayer.username = player.getName()
        await userOwnPlayer.save()
        return runner.sendResponse(201, userOwnPlayer)
      } else {
        const newPlayer = await Players.create({userId, username: player.getName()}); // Create a player in the database using Sequelize
        runner.sendResponse(201, newPlayer); // Return the newly created game as JSON
      }
    } catch (error) {
      const report = runner.sendError(400, error.message)
      console.error(error);
      return  error.constructor.name === 'NotValidUsernameException' ?
              report :
              error.constructor.name === 'UserAlreadyHasPlayerException' ?
              report :
              error.constructor.name === 'PlayerNameTakenException' ?
              report :
              runner.sendError(500, 'Server error')
    }
  };

  exports.getPlayers = async (req, res) => {
    const runner = new ServerReply(res)
    try {
      const players = await Players.findAll(); // Retrieve all players from the database using Sequelize
      runner.sendResponse(200, players) // Return the games as JSON
    } catch (err) {
      console.error(err);
      runner.sendError(500, 'Server error')
    }
  };

  exports.updatePlayer = async (req, res) => {
    const userId = req.user.id
    const {newPlayername} = req.query // accesing the value of the key newUsername in the body(x-www-form-urlencoded).
    const runner = new ServerReply(res)
    try {
        const player = new Player(newPlayername)
        const playerExist = await Players.findOne({where: {userId}})
        if (!playerExist) throw new PlayerNotExistException('You do not have a player created')

        const nameUsed = await Players.findOne({where: {username: player.getName()}})
        if (nameUsed) throw new PlayerNameTakenException('Player name already being used.')

        playerExist.username = newPlayername
        await playerExist.save()
        runner.sendResponse(200, 'Username updated succesfully') // Return the games as JSON
        
    } catch (error) {
      const report = runner.sendError(400, error.message)
        console.log(error)
        return  error.constructor.name === 'NotValidUsernameException' ?
                report :
                error.constructor.name === 'PlayerNotExistException' ?
                report :
                error.constructor.name === 'PlayerNameTakenException' ?
                report :
                runner.sendError(500, 'Server error')
    }
  };
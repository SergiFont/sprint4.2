const { Players } = require('../models'); // Import the Game model from Sequelize
const { ServerReply } = require('../utils/ServerReply.js')
const { Validator } = require('../helpers/Validator.js')

exports.createPlayer = async (req, res) => {
    const runner = new ServerReply(res)
    const check = new Validator()
    const userId = req.user.id
    const { username } = req.query
    try {
      const validName = check.isValid(username)
      if (validName !== true) return runner.sendError(400, validName)
      const userOwnPlayer = await check.userHasPlayer(userId)
      if (userOwnPlayer) return runner.sendError(403, 'You already got a player. Only one player per user.')
      const player = await Players.create({userId, username}); // Create a new game record in the database using Sequelize
      runner.sendResponse(201, player); // Return the newly created game as JSON
    } catch (err) {
      console.error(err);
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
    const runner = new ServerReply(res)
    const check = new Validator()
    const userId = req.user.id
    const {newPlayername} = req.query // accesing the value of the key newUsername in the body(x-www-form-urlencoded).
    try {
        const validName = check.isValid(newPlayername)
        if (!validName) return runner.sendError(400, validName)
        const nameUsed = await check.nameBeingUsed(newPlayername)
        if (nameUsed) return runner.sendError(400, 'Player name already being used.')
        const player = await check.playerExist(userId)
        if (!player) runner.sendError(404, 'You do not have a player created')
        else {
          player.username = newPlayername
          await player.save()
          runner.sendResponse(200, 'Username updated succesfully') // Return the games as JSON
        }
    } catch (err) {
      console.error(err);
      runner.sendError(500, 'Server error')
    }
  };
const { Players } = require('../models'); // Import the Game model from Sequelize
const { ServerReply } = require('../utils/ServerReply.js')

exports.createPlayer = async (req, res) => {
    const runner = new ServerReply(res)
    const userId = req.user.id
    const { username } = req.query
    try {
      const playerExist = await Players.findOne({
        where : {
          userId : userId
        }
      })
      if (playerExist) return runner.sendError(403, 'You already got a player. Only one player per user.')
      const player = await Players.create({userId, username}); // Create a new game record in the database using Sequelize
      runner.sendResponse(201, player); // Return the newly created game as JSON
    } catch (err) {
      console.error(err);
      runner.sendError(500, 'Server error') // Return an error response if something goes wrong
    }
  };

  exports.getPlayers = async (req, res) => {
    const runner = new ServerReply(res)
    try {
      const players = await Players.findAll(); // Retrieve all games from the database using Sequelize
      runner.sendResponse(200, players) // Return the games as JSON
    } catch (err) {
      console.error(err);
      runner.sendError(500, 'Server error') // Return an error response if something goes wrong
    }
  };

  exports.updatePlayer = async (req, res) => {
    const runner = new ServerReply(res)
    const userId = req.user.id
    const {newPlayername} = req.query // accesing the value of the key newUsername in the body(x-www-form-urlencoded).
    try {
        const player = await Players.findOne({
            where: {
                userId : userId
            }
        });
        if (!player) runner.sendError(404, 'Player not found')
        else {
          player.username = newPlayername
          await player.save()
          runner.sendResponse(200, 'Username updated succesfully') // Return the games as JSON
        }
    } catch (err) {
      console.error(err);
      runner.sendError(500, 'Server error') // Return an error response if something goes wrong
    }
  };
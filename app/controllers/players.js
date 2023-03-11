const { Players } = require('../models'); // Import the Game model from Sequelize
const {sendError, sendResponse} = require('../utils/serverReplys.js')

exports.createPlayer = async (req, res) => {
    const { username } = req.query;
    try {
      const player = await Players.create({ username }); // Create a new game record in the database using Sequelize
      sendResponse(res, 201, player); // Return the newly created game as JSON
    } catch (err) {
      console.error(err);
      sendError(res, 500, 'Server error') // Return an error response if something goes wrong
    }
  };

  exports.getPlayers = async (req, res) => {
    try {
      const players = await Players.findAll(); // Retrieve all games from the database using Sequelize
      sendResponse(res, 200, players) // Return the games as JSON
    } catch (err) {
      console.error(err);
      sendError(res, 500, 'Server error') // Return an error response if something goes wrong
    }
  };

  exports.updatePlayer = async (req, res) => {
    const {oldUsername} = req.query // accesing the value of the key oldUsername in the query params.
    const {newUsername} = req.body // accesing the value of the key newUsername in the body(x-www-form-urlencoded).
    try {
        const player = await Players.findOne({
            where: {
                username: oldUsername
            }
        });
        player.username = newUsername
        await player.save()
      sendResponse(res, 200, 'Username updated succesfully') // Return the games as JSON
    } catch (err) {
      console.error(err);
      sendError(res, 500, 'Server error') // Return an error response if something goes wrong
    }
  };
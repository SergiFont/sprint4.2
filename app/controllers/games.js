const { Games } = require('../models'); // Import the Game model from Sequelize
const {sendError, sendResponse} = require('../utils/serverReplys.js')

exports.getGames = async (req, res) => {
  try {
    const games = await Games.findAll(); // Retrieve all games from the database using Sequelize
    sendResponse(res, 200, games) // Return the games as JSON
  } catch (err) {
    console.error(err);
    sendError(res, 500, 'Server error') // Return an error response if something goes wrong
  }
};

exports.createGame = async (req, res) => {
  const { name } = req.query;
  console.log(typeof name)
//   console.log(username)
  try {
    const game = await Games.create({ name }); // Create a new game record in the database using Sequelize
    sendResponse(res, 201, game); // Return the newly created game as JSON
  } catch (err) {
    console.error(err);
    sendError(res, 500, 'Server error') // Return an error response if something goes wrong
  }
};

exports.deleteGame = async (req, res) => {
  const { name } = req.query; // Extract the game ID from the request parameters
  try {
    await Games.destroy({ where: { name } }); // Delete the game record from the database using Sequelize
    sendResponse(res, 204)
    // res.sendStatus(204); // Return a success response with no content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
  }
};
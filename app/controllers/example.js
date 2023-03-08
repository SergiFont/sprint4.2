// const { Game } = require('../models'); // Import the Game model from Sequelize
// const {sendError, sendResponse} = require('../utils/serverReplys.js')

// exports.getGames = async (req, res) => {
//   try {
//     const games = await Game.findAll(); // Retrieve all games from the database using Sequelize
//     // res.json(games);
//     sendResponse(200, games) // Return the games as JSON
//   } catch (err) {
//     console.error(err);
//     sendError(500, 'Server error')
//     // res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
//   }
// };

// exports.createGame = async (req, res) => {
//   const { player1, player2 } = req.body; // Extract the player names from the request body
//   try {
//     const game = await Game.create({ player1, player2 }); // Create a new game record in the database using Sequelize
//     res.status(201).json(game); // Return the newly created game as JSON
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
//   }
// };

// exports.deleteGame = async (req, res) => {
//   const { id } = req.params; // Extract the game ID from the request parameters
//   try {
//     await Game.destroy({ where: { id } }); // Delete the game record from the database using Sequelize
//     res.sendStatus(204); // Return a success response with no content
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
//   }
// };
const { Games } = require('../models'); // Import the Game model from Sequelize
const { Players } = require('../models');
const {sendError, sendResponse} = require('../utils/serverReplys.js')

exports.getGames = async (req, res) => {
  const userId = req.user.id
  try {
    const player = await Players.findOne({
      where : {
        userId : userId
      }
    })
    console.log(player)
    const games = await Games.findAll({
      where : {
        playerId : player.id
      }
    }); // Retrieve all games from the database using Sequelize
    sendResponse(res, 200, games) // Return the games as JSON
  } catch (err) {
    console.error(err);
    sendError(res, 500, 'Server error') // Return an error response if something goes wrong
  }
};

exports.createGame = async (req, res) => {
  const userId = req.user.id
  try {
    const dice1 = Math.ceil(Math.random() * 6)
    const dice2 = Math.ceil(Math.random() * 6)
    const victory = dice1 + dice2 === 7 ? true : false
    const player = await Players.findOne({
      where : {
        userId : userId
      }
    })
    const playerId = player.id
    const game = await Games.create({dice1, dice2, victory, playerId}); // Create a new game record in the database using Sequelize
    sendResponse(res, 201, game); // Return the newly created game as JSON
  } catch (err) {
    console.error(err);
    sendError(res, 500, 'Server error') // Return an error response if something goes wrong
  }
};

exports.deleteGames = async (req, res) => {
  const userId = req.user.id
  let player = await Players.findOne({
    where : {
      userId : userId
    }
  })
  player = player.id
  try {
    await Games.destroy({ where: { playerId : player } }); // Delete the game record from the database using Sequelize
    sendResponse(res, 200, { message: 'Games deleted succesfully' })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
  }
};
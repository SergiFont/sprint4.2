const { Games } = require('../models'); // Import the Game model from Sequelize
const { Players } = require('../models');
const { ServerReply } = require('../utils/ServerReply.js')

// const runner = new ServerReply() 

exports.getGames = async (req, res) => {
  const runner = new ServerReply(res) 
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
    runner.sendResponse(200, games) // Return the games as JSON
  } catch (err) {
    console.error(err);
    runner.sendError(500, 'Server error') // Return an error response if something goes wrong
  }
};

exports.createGame = async (req, res) => {
  const runner = new ServerReply(res)
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
    console.log(Object.prototype.toString.call(game))
    runner.sendResponse(201, game); // Return the newly created game as JSON
  } catch (err) {
    console.error(err);
    runner.sendError(500, 'Server error') // Return an error response if something goes wrong
  }
};

exports.deleteGames = async (req, res) => {
  const runner = new ServerReply(res) 
  const userId = req.user.id
  let player = await Players.findOne({
    where : {
      userId : userId
    }
  })
  player = player.id
  try {
    await Games.destroy({ where: { playerId : player } }); // Delete the game record from the database using Sequelize
    runner.sendResponse(200, 'Games deleted succesfully')
  } catch (err) {
    console.error(err);
    runner.sendError(500, 'Server Error'); // Return an error response if something goes wrong
  }
};
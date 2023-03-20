const { Games } = require('../models'); // Import the Game model from Sequelize
const { Players } = require('../models');
const { ServerReply } = require('../utils/ServerReply.js')
const { Validator } = require('./../helpers/Validator.js')
const { Game } = require('./../helpers/Game.js')

// const runner = new ServerReply() 

exports.getGames = async (req, res) => {
  const runner = new ServerReply(res)
  const check = new Validator()
  const userId = req.user.id
  try {
    const player = await check.playerExist(userId)
    if (!player) return runner.sendError(400, 'No games played.')
    const games = await check.findGames(player.id) // Retrieve all games from the database using Sequelize
    runner.sendResponse(200, games) // Return the games as JSON
  } catch (err) {
    console.error(err);
    runner.sendError(500, 'Server error') // Return an error response if something goes wrong
  }
};

exports.createGame = async (req, res) => {
  const runner = new ServerReply(res)
  const check = new Validator()
  const newGame = new Game()
  const userId = req.user.id
  try {
    let userHasPlayer = await check.playerExist(userId)
    if (!userHasPlayer) {
      await Players.create({userId, username: 'Anonymous'})
      userHasPlayer = await check.playerExist(userId)
    }
    const {dice1, dice2, victory} = newGame.getGame()
    const playerId = userHasPlayer.id
    const game = await Games.create({dice1, dice2, victory, playerId}); // Create a new game record in the database using Sequelize
    runner.sendResponse(201, game); // Return the newly created game as JSON
  } catch (err) {
    console.log(err)
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
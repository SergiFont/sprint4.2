const { Games } = require('../models') // Import the Game model from Sequelize
const { Players } = require('../models')
const ServerReply = require('../utils/ServerReply.js')
const NoGamesPlayedException = require('./../helpers/exceptions/NoGamesPlayedException.js')
const Game = require('./../helpers/Game.js')

exports.getGames = async (req, res) => {
  const runner = new ServerReply(res)
  const userId = req.user.id
  try {
    const player = await Players.findOne({where: {userId}})
    if (!player) throw new NoGamesPlayedException('No games played.')

    const games = await Games.findAll({where: {playerId: player.id}}) // Retrieve all games from the database using Sequelize
    if (!games[0]) throw new NoGamesPlayedException('No games played.')

    runner.sendResponse(200, games) // Return the games as JSON

  } catch (error) {
    const report = runner.sendError(400, error.message)
        console.log(error)
        return  error.constructor.name === 'NoGamesPlayedException' ?
                report :
                runner.sendError(500, 'Server error')
  }
}

exports.createGame = async (req, res) => {
  const userId = req.user.id
  const runner = new ServerReply(res)
  const newGame = new Game()
  try {
    let userHasPlayer = await Players.findOne({where: {userId}})
    if (!userHasPlayer) {
      await Players.create({userId, username: 'Anonymous'})
      userHasPlayer = await Players.findOne({where: {userId}})
    } // checks if the user has a player. If not, creates an anonymous player.

    const {dice1, dice2, victory} = newGame.getGame()
    const playerId = userHasPlayer.id
    const game = await Games.create({dice1, dice2, victory, playerId}); // Create a new game record in the database using Sequelize
    runner.sendResponse(201, game); // Return the newly created game as JSON
  
  } catch (err) {
    console.log(err)
    runner.sendError(500, 'Server error') // Return an error response if something goes wrong
  }
}

exports.deleteGames = async (req, res) => {
  const runner = new ServerReply(res) 
  const userId = req.user.id
  try {
    const player = await Players.findOne({where: {userId}})
    if (!player) throw new NoGamesPlayedException('No games played.')
    const playerId = player.id

    const gamesPlayed = await Games.findAll({where: {playerId}})
    console.log(gamesPlayed)
    if (!gamesPlayed[0]) throw new NoGamesPlayedException('No games played.')

    await Games.destroy({ where: {playerId} }) // Delete the game record from the database using Sequelize
    runner.sendResponse(200, 'Games deleted succesfully')
  } catch (error) {
    console.error(error);
    error.constructor.name === 'NoGamesPlayedException' ? runner.sendError(400, error.message) :
    runner.sendError(500, 'Server Error'); // Return an error response if something goes wrong
  }
}
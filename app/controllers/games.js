// const { Games } = require('../models') // Import the Game model from Sequelize
// const { Players } = require('../models')
const ServerReply = require('../utils/ServerReply.js')
const NoGamesPlayedException = require('./../helpers/exceptions/NoGamesPlayedException.js')
const Game = require('./../helpers/Game.js')
const showDevError = require('./../utils/showDevError.js')
const UsersRepositoryMysql = require('./../class/users/UsersRepositoryMysql.js')
const PlayersRepositoryMysql = require('./../class/players/PlayersRepositoryMysql.js')
const GamesRepositoryMysql = require('./../class/games/GamesRepositoryMysql.js')

exports.getGames = async (req, res) => {
  try {
    const userId = req.user.id
    const runner = new ServerReply(res)
    const games = new GamesRepositoryMysql()
    const players = new PlayersRepositoryMysql()
    const player = players.findById(userId)
    if (!player) throw new NoGamesPlayedException('No games played.')

    const gamesList = await games.findPlayerGames(player.id)
    if (!gamesList[0]) throw new NoGamesPlayedException('No games played.')

    runner.sendResponse(200, gamesList) // Return the games as JSON

  } catch (error) {
    const runner = new ServerReply(res)
    showDevError(error)
        return  error.constructor.name === 'NoGamesPlayedException' ?
                runner.sendError(400, error.message) :
                runner.sendError(500, 'Server error')
  }
}

exports.createGame = async (req, res) => {
  try {
    const userId = req.user.id
    const runner = new ServerReply(res)
    const games = new GamesRepositoryMysql()
    const players = new PlayersRepositoryMysql()
    const newGame = new Game()
    let userHasPlayer = await players.findById(userId)
    if (!userHasPlayer) {
      await players.createPlayer(userId, 'Anonymous')
      userHasPlayer = await players.findById(userId)
    } // checks if the user has a player. If not, creates an anonymous player.

    const {dice1, dice2, victory} = newGame.getGame()
    const playerId = userHasPlayer.id
    const game = await games.createGame(dice1, dice2, victory, playerId)
    runner.sendResponse(201, game); // Return the newly created game as JSON
  
  } catch (error) {
    const runner = new ServerReply(res)
    showDevError(error)
    runner.sendError(500, 'Server error') // Return an error response if something goes wrong
  }
}

exports.deleteGames = async (req, res) => {
  try {
    const userId = req.user.id
    const runner = new ServerReply(res)
    const games = new GamesRepositoryMysql()
    const players = new PlayersRepositoryMysql()

    const player = await players.findById(userId)

    if (!player) throw new NoGamesPlayedException('No games played.')

    const gamesPlayed = await games.findPlayerGames(player.id)
    if (!gamesPlayed[0]) throw new NoGamesPlayedException('No games played.')

    await games.deleteGames(player.id)
    runner.sendResponse(200, 'Games deleted succesfully')
  } catch (error) {
    const runner = new ServerReply(res)
    showDevError(error)
    error.constructor.name === 'NoGamesPlayedException' ? runner.sendError(400, error.message) :
    runner.sendError(500, 'Server Error'); // Return an error response if something goes wrong
  }
}
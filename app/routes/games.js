const express = require('express')
const router = express.Router()
const { getGames, createGame, deleteGame} = require('./../controllers/games.js')

router.route('/:name?')
    .post(createGame)
    .delete(deleteGame)
    .get(getGames)

  module.exports = router
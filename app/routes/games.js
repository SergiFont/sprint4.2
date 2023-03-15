const express = require('express')
const router = express.Router()
const { getGames, createGame, deleteGames} = require('./../controllers/games.js')

router.route('/:name?')
    .post(createGame)
    .delete(deleteGames)
    .get(getGames)

  module.exports = router
const express = require('express')
const router = express.Router()
const  getGames  = require ('./../controllers/games/getGames.js')
const  createGame  = require ('./../controllers/games/createGame.js')
const  deleteGames  = require ('./../controllers/games/deleteGames.js')

router.route('/')
    .post(createGame)
    .delete(deleteGames)
    .get(getGames)

  module.exports = router
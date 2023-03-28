const express = require('express')
const router = express.Router()
const createPlayer = require ('./../controllers/players/createPlayer.js')
const getPlayers = require ('./../controllers/players/getPlayers.js')
const updatePlayer = require ('./../controllers/players/updatePlayer.js')
const validatePlayer = require('./../middlewares/validatePlayer.js')

router.route('/')
    .post(validatePlayer, createPlayer) // crear jugador
    .get(getPlayers) // lista jugadores
    .put(validatePlayer, updatePlayer) // modificar nombre jugador

module.exports = router
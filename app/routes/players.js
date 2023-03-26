const express = require('express')
const router = express.Router()
const createPlayer = require ('./../controllers/players/createPlayer.js')
const getPlayers = require ('./../controllers/players/getPlayers.js')
const updatePlayer = require ('./../controllers/players/updatePlayer.js')

router.route('/')
    .post(createPlayer) // crear jugador
    .get(getPlayers) // lista jugadores
    .put(updatePlayer) // modificar nombre jugador

module.exports = router
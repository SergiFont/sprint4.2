const express = require('express')
const router = express.Router()
const { getPlayers, createPlayer, updatePlayer} = require('./../controllers/players.js')

router.route('/:username?')
    .post(createPlayer) // crear jugador
    .get(getPlayers) // lista jugadores
    .put(updatePlayer) // modificar nombre jugador

module.exports = router
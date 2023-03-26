const express = require('express')
const router = express.Router()
const  getRanking  = require('./../controllers/rankings/getRanking.js')
const getBestPlayer = require('./../controllers/rankings/getBestPlayer.js')
const getWorstPlayer = require('./../controllers/rankings/getWorstPlayer.js')

router.get('/', getRanking)

router.get('/loser', getWorstPlayer)

router.get('/winner', getBestPlayer)

module.exports = router
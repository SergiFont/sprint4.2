const express = require('express')
const router = express.Router()
const { getRanking } = require('./../controllers/rankings.js')

router.get('/', getRanking)

router.get('/loser', )

router.get('/winner', )

module.exports = router
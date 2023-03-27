const express = require('express')
const router = express.Router()
const {createUser} = require('./../controllers/createUser.js')
const validateCredentials = require('./../middlewares/validateCredentials.js')

router.post('/', validateCredentials, createUser)

module.exports = router
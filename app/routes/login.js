const express = require('express')
const router = express.Router()
const {loginUser} = require('./../controllers/loginUser.js')
const validateCredentials = require('./../middlewares/validateCredentials.js')

router.post('/', validateCredentials, loginUser)

module.exports = router
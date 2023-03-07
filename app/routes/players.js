const express = require('express')
const router = express.Router()

router.route('/:id?')
    .post()
    .get()
    .put()

module.exports = router
const express = require('express')
const router = express.Router()

router.route('/:id')
    .post()
    .delete()
    .get()

  module.exports = router
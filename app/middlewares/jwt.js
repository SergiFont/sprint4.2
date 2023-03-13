const {expressjwt: jwt} = require('express-jwt')

const jwtMiddleware = jwt({
    secret: 'mysecret',
    algorithms: ['HS256']
})

module.exports = jwtMiddleware
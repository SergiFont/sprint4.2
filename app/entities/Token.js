const jwt = require('jsonwebtoken')

class Token {
    #token

    constructor(id){
        const secretKey = process.env.TOKEN_KEY
        const payload = {
            id
        }
        this.#token = jwt.sign(payload, secretKey, { expiresIn: '10h' })
    }

    getToken() {
        return this.#token
    }
}

module.exports = Token
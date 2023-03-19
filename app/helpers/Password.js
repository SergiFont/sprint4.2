const bcrypt = require('bcrypt')


class Password {

    checkPassword = async function(password, userPassword) {
        return bcrypt.compare(password, userPassword)
    }

    storePassword = async function(password) {
        return bcrypt.hash(password, 10)
    }
}

module.exports = { Password }
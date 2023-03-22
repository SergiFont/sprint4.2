const bcrypt = require('bcrypt')


class CrypterService {

    validate = async function(value, valueToCheck) {
        return bcrypt.compare(value, valueToCheck)
    }

    generateCrypt = async function(value) {
        return bcrypt.hash(value, 10)
    }
}

module.exports = CrypterService

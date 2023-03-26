const NotValidPasswordException = require('../helpers/exceptions/NotValidPasswordException.js')
const CrypterService = require('./../helpers/CrypterService.js')

class Password {

    #password

    async cryptPassword(password) {
        if (password.indexOf(' ') !== -1) throw new NotValidPasswordException('Password can not has empty spaces')
        if (password.trim() === "") throw new NotValidPasswordException('Password can not be empty')
        if (password.length < 6) throw new NotValidPasswordException('Password must contain at least 6 characters')
        const crypterService = new CrypterService()
        this.#password = await crypterService.generateCrypt(password)
    }

    getPassword() {
        return this.#password
    }
}

module.exports = Password
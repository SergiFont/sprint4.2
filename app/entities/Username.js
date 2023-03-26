const NotValidUsernameException = require('../helpers/exceptions/NotValidUsernameException.js')

class Username {

    #username

    constructor(username) {
        if (username.indexOf(' ') !== -1) throw new NotValidUsernameException('Username can not has empty spaces')
        if (username.trim() === "") throw new NotValidUsernameException('Enter a username please')
        if (username.length > 15 || username.length < 3) throw new NotValidUsernameException('Username can not be smaller than 3 or bigger than 15 characters')
        this.#username = username
    }
    getUsername() {
        return this.#username
    }
}

module.exports = Username
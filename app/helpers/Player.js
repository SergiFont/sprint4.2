const NotValidUsernameException = require('./exceptions/NotValidUsernameException.js')

class Player {
    #name

    constructor(name) {
        if (name.indexOf(' ') !== -1) throw new NotValidUsernameException('Name can not has empty spaces')
        if (name.trim() === "") throw new NotValidUsernameException('Enter a name please')
        if (name.length > 15 || name.length < 3) throw new NotValidUsernameException('Name can not be smaller than 3 or bigger than 15 characters')
        this.#name = name
    }

    getName() {
        return this.#name
    }
}

module.exports = Player
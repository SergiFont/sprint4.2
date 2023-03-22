class NotValidUsernameException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = NotValidUsernameException
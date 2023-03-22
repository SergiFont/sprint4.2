class UserAlreadyHasPlayerException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = UserAlreadyHasPlayerException 
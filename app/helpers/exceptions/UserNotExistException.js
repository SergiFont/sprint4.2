class UserNotExistException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = UserNotExistException
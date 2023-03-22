class NotValidPasswordException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = NotValidPasswordException
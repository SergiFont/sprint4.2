class NotMatchingPasswordException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = NotMatchingPasswordException
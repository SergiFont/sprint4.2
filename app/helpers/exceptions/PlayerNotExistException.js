class PlayerNotExistException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = PlayerNotExistException
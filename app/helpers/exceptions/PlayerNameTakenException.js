class PlayerNameTakenException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = PlayerNameTakenException
class NoGamesPlayedException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = NoGamesPlayedException
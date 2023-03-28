class AuthorizationHeaderMissingException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = AuthorizationHeaderMissingException
require('dotenv').config()

const logger = (req, res, next) => {
    if (process.env.DEV === "true") console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
}

module.exports = logger
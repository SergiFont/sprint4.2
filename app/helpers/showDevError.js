require('dotenv').config()

const showDevError = (error) => {
    if (process.env.DEV === "true") console.log(error)
}

module.exports = showDevError
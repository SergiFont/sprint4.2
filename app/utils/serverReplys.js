const sendError = (res, status, message) => {
    res.status(status).json({ error: message })
}

const sendResponse = (res, status, response) => {
    res.status(status).json(response)
}

module.exports = {sendError, sendResponse}
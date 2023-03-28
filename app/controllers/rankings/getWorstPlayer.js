const ServerReply = require('../../helpers/ServerReply.js')
const showDevError = require('../../helpers/showDevError.js')
const Ranking = require('./../../entities/Ranking.js')

const getWorstPlayer = async (req, res) => {
    try {
        const runner = new ServerReply(res)
        const rankings = new Ranking()
        const result = await rankings.worstPlayer()
        runner.sendResponse(200, result)    
    } catch (error) {
        const runner = new ServerReply(res)
        showDevError(error)
        runner.sendError(500, 'Server error')
    }
}

module.exports = getWorstPlayer
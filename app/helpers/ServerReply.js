class ServerReply {
    constructor(res) {
        this.res = res
    }
    sendError(status, contents){
        this.res.status(status).json({error: contents})
    }
    sendResponse(status, contents){
        if(typeof contents === 'object' && Object.prototype.toString.call(contents) === '[object Object]') { // using Object.prototype.toString.call to prevent errors
            this.res.status(status).json(contents)
        } else {
            this.res.status(status).json({ message: contents })
        }
    }
}

module.exports = ServerReply 
const express = require('express')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.routes()
    }

    routes() {
        this.app
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log()
        })
    }
}



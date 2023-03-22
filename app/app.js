const express = require('express')
const logger = require('./utils/logger.js')
const playersRouter = require('./routes/players.js')
const gamesRouter = require('./routes/games.js')
const rankingRouter = require('./routes/ranking.js')
const registerRouter = require('./routes/register.js')
const loginRouter = require('./routes/login.js')
// const mysql = require('mysql2')
const db = require('./models')
const jwtMiddleware = require('./middlewares/verifyToken.js')
const createAdmin = require('./helpers/createAdmin.js')

const app = express()
const port = process.env.DATABASE_PORT
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(logger)

app.use('/register', registerRouter)
app.use('/login', loginRouter)

app.use(jwtMiddleware)
app.use('/players', playersRouter)
app.use('/games', gamesRouter)
app.use('/ranking', rankingRouter)


db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized')
    return createAdmin()
  })
  .then(()=> {
    console.log('Admin created succesfully')
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
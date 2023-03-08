const express = require('express')
const logger = require('./utils/logger.js')
const playersRouter = require('./routes/players.js')
const gamesRouter = require('./routes/games.js')
const rankingRouter = require('./routes/ranking.js')
const mysql = require('mysql2')
const db = require('./models')

const app = express()
const port = process.env.DATABASE_PORT
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(logger)

app.use('/players', playersRouter) // post, crear jugador
// put '/:id', modificar nombre
// get, listado jugadores
app.use('/games', gamesRouter) // post '/:id', un jugador específico realiza una tirada 
// delete '/:id', eliminar tiradas de un jugador
// get '/:id', listado de tiradas de un jugador
app.use('/ranking', rankingRouter) // get, ranking de jugadores ordenado por % de exitos y % medio de exitos
// get, devuelve el jugador con peor porcentaje de éxito 
// get, devuelve el jugador con mejor porcentaje de éxito

db.sequelize.sync().then((req)=> {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
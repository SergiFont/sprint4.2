const GamesRepositoryMysql = require('./games/GamesRepositoryMysql')
const PlayersRepositoryMysql = require('./players/PlayersRepositoryMysql')
const UsersRepositoryMysql = require('./users/UsersRepositoryMysql')

const configUserRepository = () => {
    if (process.env.DB === 'mysql') return new UsersRepositoryMysql()
}
  
const configGameRepository = () => {
    if (process.env.DB === 'mysql') return new GamesRepositoryMysql()
}

const configPlayerRepository = () => {
    if (process.env.DB === 'mysql') return new PlayersRepositoryMysql()
}
  
  const users = configUserRepository()
  const games = configGameRepository()
  const players = configPlayerRepository()
  
  module.exports = { users, games, players }
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Player = require('./Players.js')
const Games = require('./Games.js')

const sequelize = new Sequelize(config.database, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); /*this code does several things:
1- It reads all the models in the models directory (filtering tests and some more kind of files.)
2- Loads the remaining models and assign them to the `db` object. 
3- Checks if the models got an associate function. If they do, it calls it. */

Player.hasMany(Games, { as: 'games', foreignKey: 'playerId' });
Games.belongsTo(Player, { as: 'player', foreignKey: 'playerId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

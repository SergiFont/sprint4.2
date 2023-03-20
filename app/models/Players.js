const Games = require('./Games.js')
const Users = require('./Users.js')

module.exports = (sequelize, DataTypes) => {
    const Players = sequelize.define("Players", {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          notEmpty: true
        }
      },
    });

    Players.associate = (models) => {
      Players.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
    };
    Players.associate = (models) => {
      Players.hasMany(models.Games, { as: 'game', foreignKey: 'playerId' });
    };
  
    return Players;
  };
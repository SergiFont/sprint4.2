const Players = require('./Players.js')

module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define("Games", {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      dice1: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
        // validate : {
        //   notEmpty: true
        // }
      },
      dice2: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
        // validate : {
        //   notEmpty: true
        // }
      },
      victory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });

    Games.associate = (models) => {
      Games.belongsTo(models.Players, { as: 'player', foreignKey: 'playerId' });
    };
  
    return Games;
  };
module.exports = (sequelize, DataTypes) => {
    const Players = sequelize.define("Players", {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        defaultValue: null
      },
    });
  
    return Players;
  };
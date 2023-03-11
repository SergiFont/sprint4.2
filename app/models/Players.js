module.exports = (sequelize, DataTypes) => {
    const Players = sequelize.define("Players", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
      },
    });
  
    return Players;
  };
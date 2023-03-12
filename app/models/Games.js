module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define("Games", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
      },
      dice1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: true
        }
      },
      dice2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: true
        }
      },
      victory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      

    });
  
    return Games;
  };
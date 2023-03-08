module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define("Games", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
      },
    });
  
    return Games;
  };
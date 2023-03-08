module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Players", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            noEmpty: true
        }
      },
    });
  
    return Posts;
  };
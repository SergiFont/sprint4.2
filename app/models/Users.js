const Players = require('./Players.js')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate : {
            notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
      }
    });

    Users.associate = (models) => {
        Users.hasOne(models.Players, { as: 'player', foreignKey: 'userId' });
    };

    Users.prototype.verifyPassword = async function(password){
      return await bcrypt.compare(password, this.password)
    } 
    
    return Users;
  };
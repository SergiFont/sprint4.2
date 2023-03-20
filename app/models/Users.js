const Players = require('./Players.js')
// const { Validator } = require('../helpers/Validator.js')
const { Password } = require('./../helpers/Password.js')
// const bcrypt = require('bcrypt')

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
      },
      role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 2,
        validate : {
          notEmpty: true
        }
      }
    }); // 0 = 'admin', 1 = 'player', 2 = 'guest'

    Users.associate = (models) => {
        Users.hasOne(models.Players, { as: 'player', foreignKey: 'userId' });
    };
    const p = new Password()
    Users.prototype.verifyPassword = async function(password){
      return await p.checkPassword(password, this.password)
    }
    
    return Users;
  };
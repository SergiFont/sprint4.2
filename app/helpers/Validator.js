const { Users } = require('../models')
const { Players } = require('../models')
const { Games } = require('../models')

class Validator {
    constructor(){}
    
    containBlankSpaces = subject => {
        if (subject.indexOf(' ') !== -1) return true
        else return false
    }
    
    emptyUsername = subject => {
        if (subject.trim() === "") return true
        else return false
    }

    limitLength = subject => {
        if(subject.length > 15 || subject.length < 3) return true
        else return false
    }

    isValid = subject => {
        const errors = []
        if (this.containBlankSpaces(subject)) errors.push('Name cannot contain white spaces')
        if (this.emptyUsername(subject)) errors.push('Insert a username please')
        if (this.limitLength(subject)) errors.push('Characters limited between 3 and 15')
        if (errors.length === 0) return true
        else return errors
    }

    userHasPlayer = async subject => {
        const player = await Players.findOne({
            where: {
                userId : subject
            }
        })
        return player
    }

    nameBeingUsed = async subject => {
        const name = await Players.findOne({
            where: {
                username: subject
            }
        })
        return name
    }

    playerExist = async subject => {
        const player = await Players.findOne({
            where: {
                userId : subject
            }
        })
        return player
    }

    userNameTaken = async subject => {
        const username = await Users.findOne({
            where: {
                user: subject
            }
        })
        return username
    }

    findGames = async subject => {
        const games = await Games.findAll({
            where: {
                playerId: subject
            }
        })
        return games
    }

    findUser = async subject => {
        const user = await Users.findOne({
            where: {
                id: subject
            }
        })
        return user
    }

    updateUserRole = async subject => {
        const user = await this.findUser(subject)
        if (user.role === 1 || user.role === 0) return 
        user.role = 1
        await user.save()
    }
}

module.exports = {Validator}
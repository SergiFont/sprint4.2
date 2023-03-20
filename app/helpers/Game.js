class Game {
    #dice1
    #dice2
    #victory
    constructor() {
        this.#dice1 = Math.ceil(Math.random() * 6)
        this.#dice2 = Math.ceil(Math.random() * 6)
    }

    getDice1() {
        return this.#dice1
    }

    getDice2() {
        return this.#dice2
    }

    getVictory() {
        this.#victory = this.getDice1() + this.getDice2() === 7 ?
        true : false
        return this.#victory
    }

    getGame() {
        const dice1 = this.getDice1()
        const dice2 = this.getDice2()
        const victory = this.getVictory()
        return {dice1, dice2, victory}
    }
}

module.exports = { Game }
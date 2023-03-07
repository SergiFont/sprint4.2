// recibir por parámetro un JSON con el nombre de usuario DONE
// devolver un JSON que contenga la hora y data actual DONE
// incluir middleware que añada HEADER: Cache-control: no-cache DONE
// habilitar CORS (Cross-Origin Resource Sharing)
const {days, months} = require('./../helpers/dateArrays.js')

const showDateTime = (req, res) => {
    const time = new Date()
    if (!req.query.name) return res.status(401).send('Insert a key name and a value as a parameter please')
    const response = {
        message: `Welcome ${req.query.name}!`,
        hours: time.getHours(),
        minuts: time.getMinutes(),
        seconds: time.getSeconds(),
        day: days[time.getDay()],
        month: months[time.getMonth()],
        year: time.getFullYear(),
        }
        return res.json(response)
}

module.exports = {showDateTime}


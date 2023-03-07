// const auth = require('basic-auth')


// const authUser = (req, res, next) => {
//     const user = auth(req)
//     if (!user) return res.status(401).send('Identify yourself please')
//     if (user.name === '' || user.pass === '') return res.status(401).send('A user and password is required')
//     next()
// }

// module.exports = authUser
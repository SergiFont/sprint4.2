// const path = require('path')

// const valImage = (req, res, next) => {
//     if (!req.files) return res.status(400).send('No file was uploaded')
//     const {image} = req.files
//     if (path.extname(image.name) !== ('.jpg' || '.png' || '.gif')) return res.status(400).send('Not valid image type')
//     if (!/^image/.test(image.mimetype)) return res.status(400).send('Error. Not an image')
//     next()
// }

// module.exports = valImage
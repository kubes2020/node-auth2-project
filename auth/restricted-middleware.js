const { jwtSecret } = require('./secrets.js')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'we want a token'})
    }
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.log('decoded error', err)
            return res.status(401).json({message: 'token is bad'})
        }
        console.log('decoded token', decoded)
        req.decodedJwt = decoded
        next()
    })
}
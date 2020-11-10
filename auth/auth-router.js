const bcryptjs = require('bcryptjs')
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Users = require('../users/users-model.js')
const { isValid } = require('../users/users-service.js')
const { jwtSecret } = require('./secrets.js')


router.post('/register', (req, res) => {
    const credentials = req.body
 
    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8

        // hash the password
        const hash = bcrypt.hashSync(credentials.password, rounds)
        credentials.password = hash

        //save the user to the database
        Users.add(credentials)
        .then(user => {
            res.status(200).json({ data: user })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } else {
        res.status(400).json({
            message: 'please provide username and password'
        })     
    }
    console.log('credsss', req.body)
})

router.post('/login', (req, res)=> {
    const { username, password } = req.body
    
    if (isValid(req.body)) {
        Users.findBy({ username })
        .then(([user]) => {
            if (user && bcryptjs.compareSync(password, user.password)){
                const token = makeToken(user)
                res.status(200).json({ message: 'Welcome to our API', token })
            } else {
                res.status(401).json({ message: 'invalid credentials' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } else {
        res.status(400).json({
            message: 'please provide username and password'
        })
    }
})

function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
    }
    const options = {
        expiresIn: '45 seconds',
    }
    return jwt.sign(payload, jwtSecret, options)
}


module.exports = router
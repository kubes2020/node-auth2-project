const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

server.get('/', (req, res)=> {
    res.send('endpoint is working!')
})

module.exports = server
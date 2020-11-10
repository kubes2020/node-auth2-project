require('dotenv').config()
const server = require('./server.js')
const port = process.env.PORT || 4500

server.listen(port, ()=> {
    console.log(`**server is listneing on port ${port}**`)
})
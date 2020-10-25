const express = require('express')
const bodyParser = require(`body-parser`)
const api = require(`./server/routes/api`)
const path = require(`path`)
///////////////////////////
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

////////////////////////////


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, `dist`)))
app.use(express.static(path.join(__dirname, `node_modules`)))
app.use(`/`, api)
//////////////////////

let users = []

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('userConnected', (userName) => {
      users.push(userName)
      io.emit('userConnected', users)
      console.log(userName + " is online")
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
///////////////////////////////////
const PORT = 3000

// app.listen(port, function () {
//     console.log("listening");

// })
http.listen(process.env.PORT || PORT, function(){
    console.log(`running on port ${PORT}`)  
})
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


io.on('connection', function(socket) {
    socket.on('userConnected', (userName) => {
      console.log(userName + " is online")
      users.push({userName, id: socket.id})
      io.emit('userConnected', users)
    })
   socket.on('disconnect', function() {
      let index
      for (let i = 0; i < users.length; i++){
        if (users[i].id === socket.id){
          console.log(users[i].userName + " disconnected")
          index = i
        }
      }
      users.splice(index, 1)
      io.emit('userDisconnected', users)
   })
})
// io.on('connection', (socket) => {
//     console.log(socket.conn.id + ' connected')
//     socket.on('userConnected', (userName) => {
//       users.push(userName)
//       io.emit('userConnected', users)
//       console.log(userName + " is online")
//     })
//     socket.on('disconnect', (socket) => {
//       console.log(socket.conn.id + ' disconnected')
//     })
//   })
///////////////////////////////////
const PORT = 3000

// app.listen(port, function () {
//     console.log("listening");

// })
http.listen(process.env.PORT || PORT, function(){
    console.log(`running on port ${PORT}`)  
})
const socket = io();

function myFunction() {
    let userName = document.getElementById("myText").value
    socket.emit('userConnected', userName)
  }

  socket.on('userConnected', (users) => {
    $('#onlineUsers').empty()
    users.forEach(user => {
      $('#onlineUsers').append($('<li>').text(user))
    })
  })
const io = require('socket.io')(3000, {
    cors: {
      origin: '*',
    }
  });

  const users = {}

io.on('connection', socket =>{

    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message', {message: message, uname : users[socket.id]})
    })

    socket.on('user-joined', name =>{
        users[socket.id] = name
        socket.broadcast.emit(`user-connected`, name)
    })

    socket.on('disconnect', () =>{
        
        socket.broadcast.emit(`user-disconnected`, users[socket.id])

        delete users[socket.id]
    })



})
export default function(io: SocketIO.Server){
    io.sockets.on('connection', function(socket) {
        
        socket.on('hello', () => {
            socket.emit("message", 'It works')
        })

    })
}
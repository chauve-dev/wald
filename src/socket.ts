import cookie from 'cookie'

export default function(io: SocketIO.Server){
    io.sockets.on('connection', function(socket) {

        console.log('user as '+socket.id)
        console.log(cookie.parse(socket.handshake.headers.cookie.toString()).waldSession)
        
        socket.on('hello', () => {
            socket.emit("message", 'It works')
        })

    })
}
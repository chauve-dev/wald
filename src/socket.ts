export default function(io: SocketIO.Server){
    io.sockets.on('connection', function(socket) {

        //console.log('user as '+socket.id)
        //console.log(socket.request.session)
        
        socket.on('hello', () => {
            socket.emit("message", 'It works')
        })

    })
}
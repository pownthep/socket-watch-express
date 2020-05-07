var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('vlc cmd', (msg) => {
        console.log(msg);
        socket.broadcast.emit('vlc cmd', msg);
    });
    socket.on('url input', (msg) => {
        console.log(msg);
        socket.broadcast.emit('url input', msg);
    });
    socket.on('seek cmd', (msg) => {
        console.log(msg);
        socket.broadcast.emit('seek cmd', msg);
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});
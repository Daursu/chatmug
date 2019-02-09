const restify = require('restify');
const socketio = require('socket.io');
const server = restify.createServer();
const io = socketio.listen(server.server);

server.get('/', function indexHTML(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end('Hello');
    next();
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.listen(8080, function () {
    console.log('socket.io server listening at %s', server.url);
});

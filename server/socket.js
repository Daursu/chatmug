const socketio = require('socket.io');
const uuid = require('uuid');
const auth = require('./auth');

module.exports = (server, store) => {
  const io = socketio.listen(server.server);

  /*---------------------------------------
    Helper function that logs a user out
    and notifies all the chat members
    that a user left
--------------------------------------------*/
  const logout = (socket, username) => {
    store.srem('users', username);

    // Let the channel know the user disconnected
    socket.broadcast.emit('left', {
      username
    });
  };

  /*---------------------------------------
    Checks the JWT token, and if valid
    allows the user to establish a websocket
    connection, otherwise it declines
    the connection.
--------------------------------------------*/
  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    if (auth.validAuthorization(token)) {
      return next();
    }

    return next(new Error('Unauthorized'));
  });

  /*---------------------------------------
    Called when a user has successfully
    established a connection.

    Here we bind event hooks
--------------------------------------------*/
  io.sockets.on('connection', (socket) => {
    const token = socket.handshake.query.token;
    const username = auth.getUsername(token);

    // Store the username in the redis store
    store.sadd('users', username);

    // Let everyone know a new user joined
    socket.broadcast.emit('joined', {
      username,
    });

    // Send the list of connected users
    store.smembersAsync('users').then(users => {
      socket.emit('users', users);
    });

    // Handle incoming messages from the user
    // @property message - string
    socket.on('message', (message) => {
      // Send the message to every user connected
      socket.broadcast.emit('message', {
        id: uuid(),
        message,
        username,
        timestamp: Date.now(),
      });
    });

    // Handle logout
    socket.on('logout', () => logout(socket, username));

    // Handle disconnections
    socket.on('disconnect', () => logout(socket, username));
  });
};

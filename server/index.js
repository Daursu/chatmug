const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const redis = require('redis');
const bluebird = require('bluebird');
const auth = require('./auth');
const server = restify.createServer();

// Use promises with the redis client
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// Instantiate a new redis connection
const store = redis.createClient({
  host: process.env.REDIS_HOST,
});

// Register Socket.io
require('./socket')(server, store);

const cors = corsMiddleware({
  origins: ['*'],
});

// Enable CORS
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end('Hello');
  next();
});

/*---------------------------------------
    Defines the login endpoint.
--------------------------------------------*/
server.post('/login', async (req, res, next) => {
  const { params: { username } } = req;
  res.contentType = 'json';

  // Check redis store for the username
  const exists = await store.sismemberAsync('users', username).then(response => response);

  if (exists) {
    res.status(422);
    res.send({
      error: 'This username already exists. Please try another one.'
    });
  } else {
    res.send(auth.generateAuthToken(username));
  }

  next();
});

/*---------------------------------------
    Starts the server
--------------------------------------------*/
server.listen(process.env.SERVER_PORT || 3000, () => {
  console.log('socket.io server listening at %s', server.url);
});

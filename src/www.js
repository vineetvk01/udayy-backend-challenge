import app from './app';
import http from 'http';
import constants from './constants';


/**
 * Listen on provided port, on all network interfaces.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(constants.PORT);

app.set('port', port);

const server = http.createServer(app);

/**
 * Event listener for HTTP server 'error' event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.log(`${bind} requires elevated privileges`);
    process.exit(1);
  case 'EADDRINUSE':
    console.log(`${bind} is already in use`);
    process.exit(1);
  default:
    throw error;
  }
};

/**
 * Event listener for HTTP server 'listening' event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
};

server.on('error', onError);
server.on('listening', onListening);

server.listen(port);
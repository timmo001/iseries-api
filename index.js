const app = require('./app'),
  debug = require('debug')('demo:server'),
  http = require('http'),
  https = require('https'),
  fs = require('fs');

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '28365');
app.set('port', port);

/**
 * Create HTTP server.
 */
let server;
if (fs.existsSync('fullchain.pem')) {
  server = https.createServer({
    cert: fs.readFileSync('fullchain.pem').toString(),
    key: fs.readFileSync('privkey.pem').toString()
  }, app);
} else {
  server = http.createServer(app);
  console.log('SSL (HTTPS) is not active!!!');
}

require('./websocket')(server, {});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API is live on port ${port}.`));
server.on('error', onError);
server.on('listening', onListening);

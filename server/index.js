const app = require('./app-serverless');
// var http = require('http');
// const proxy = require('@webserverless/fc-express');
// eslint-disable-next-line node/no-extraneous-require
var getRawBody = require('raw-body');


// For Aliyun serverless
const server = new proxy.Server(app);
// const port = normalizePort(process.env.PORT || '4000');
// app.set('port', port)
// const server = http.createServer(app);

// http trigger entry
module.exports.handler = async (req, res, context) => {
  try {
    // server.listen(port);
    // server.on('error', onError);
    // server.on('listening', onListening);
    var params = {
      path: req.path,
      queries: req.queries,
      headers: req.headers,
      method : req.method,
      requestURI : req.url,
      clientIP : req.clientIP
    }

    getRawBody(req, function(err, body) {
        res.setHeader('content-type', 'text/json');

        for (var key in req.queries) {
          var value = req.queries[key];
          res.setHeader(key, value);
        }
        params.body = body.toString();
        // res.send(JSON.stringify(params, null, '    '));
        server.httpProxy(req, res, context);
    });

    // server.httpProxy(req, res, context);

  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ req, res, context, error }));
  }
};

// api gateway entry
// module.exports.handler = function(event, context, callback) {
//   try {
//     server.proxy(event, context, callback);
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
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

function onError(error) {
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
      // process.exit(1);
      throw(error);
      // break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      // process.exit(1);
      throw(error);
      // break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

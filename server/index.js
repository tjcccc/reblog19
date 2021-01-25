const app = require('./app-serverless');
const { Server } = require('@webserverless/fc-express');

// For Aliyun serverless
const server = new Server(app);

// http trigger entry
module.exports.handler = function(req, res, context) {
  server.httpProxy(req, res, context);
};

// api gateway entry
// module.exports.handler = function(event, context, callback) {
//   server.proxy(event, context, callback);
// };

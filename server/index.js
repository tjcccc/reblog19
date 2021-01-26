const app = require('./app-serverless');
const { Server } = require('@webserverless/fc-express');

// For Aliyun serverless
const server = new Server(app);

// http trigger entry
module.exports.handler = function(req, res, context) {
  try {
    server.httpProxy(req, res, context);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

};

// api gateway entry
// module.exports.handler = function(event, context, callback) {
//   server.proxy(event, context, callback);
// };

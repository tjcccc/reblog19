const winston = require('winston');

// Logger Configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({ level, message, meta }) => {
      let isObject = typeof message === 'object';
      return `${level}: ${isObject ? JSON.stringify(message, null, 4) : message} ${meta? JSON.stringify(meta) : ''}`;
    })
    // winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({ json: true, stringify: true }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

module.exports = logger;

const logger = require('./logger');
const mongoose = require('mongoose');
const dbConfig = require('../db-config');

mongoose.set('useFindAndModify', false);

const dbConnection = (req, res, next) => {
  mongoose.connect(dbConfig.mongo.host, {
    auth: {
      user: dbConfig.mongo.user,
      password: dbConfig.mongo.password
    },
    authSource: dbConfig.mongo.database,
    useNewUrlParser: true
  }, error => {
    if (error) {
      logger.error(error);
    } else {
      logger.info('Database is connected.');
      next();
    }
  });
}

module.exports = dbConnection;

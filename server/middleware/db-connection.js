const logger = require('./logger');
const mongoose = require('mongoose');
const dbConfig = require('../db-config');

mongoose.set('useFindAndModify', false);

const dbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 0) {
    next();
    return;
  }

  // Common mongoDB server
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

  // mongoDB Atlas
  // const atlasUri = `mongodb+srv://${dbConfig.mongo.user}:${dbConfig.mongo.password}@${dbConfig.mongo.host}/${dbConfig.mongo.database}?retryWrites=true&w=majority`;
  // const options = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }
  // mongoose.connect(atlasUri, options, error => {
  //   if (error) {
  //     logger.error(error);
  //   } else {
  //     logger.info('Database is connected.');
  //     next();
  //   }
  // });
}

module.exports = dbConnection;

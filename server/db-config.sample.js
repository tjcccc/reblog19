// Set your MongoDB configuration and save as db-config.js.

const dbConfig = {
  isMongoDBAtlas: false,
  mongo: {
    mongoUrl: 'mongodb://username:password@ip:port/db',
    host: 'mongodb://ip:port/db',
    user: 'username',
    password: 'password',
    database: 'db'
  }
};

module.exports = dbConfig;

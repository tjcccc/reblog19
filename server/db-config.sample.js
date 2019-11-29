// Set your MongoDB configuration and save as db-config.js.

const dbConfig = {
  isMongoDBAtlas: false,
  mongo: {
    host: 'mongodb://ip:port/db',
    user: 'username',
    password: 'password',
    database: 'db'
  }
};

module.exports = dbConfig;

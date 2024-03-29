// Express
const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// System
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');

// Database
// const mongoose = require('mongoose');
const dbConnection = require('./middleware/db-connection');
const dbConfig = require('./db-config');

// GraphQL
const graphqlHTTP = require('./graphql/http');

// Authorization
const { isAuthorized } = require('./middleware/authorization');
// const { default: serverConfig } = require('../src/config/server');

const app = express();

// gzip Compression
app.use(compression());

// Session
app.set('trust proxy', 1);
app.use(session({
  key: 'reblog19-server-session-store',
  secret: 'r-E-b-L-O-G-!(',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongo.mongoUrl,
    dbName: 'reblog19',
    collectionName: 'sessions'
  })
}));

// Helmet
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? true : false
}));
app.disable('x-powered-by');

// Server
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(dbConnection);
app.use(isAuthorized);
app.use('/graphql', graphqlHTTP);

app.get('/', (req, res) => {
  res.send('<h1>hello, reblog19 server.</h1>');
});

const PORT = process.env.PORT || 4000;

app.listen(4000, () => logger.info(`Server started on port ${PORT}.`));

// Express
const express = require('express');
const morgan = require('morgan');
const logger = require('./middlewares/logger');
const bodyParser = require('body-parser');

// Database
const dbConnection = require('./middlewares/db-connection');

// GraphQL
const graphqlHTTP = require('./graphql/http');

// Cross-Origin Resource Sharing
const cors = require('./middlewares/cors');

// Authoration
const { isAuthorized } = require('./middlewares/authorization');

const app = express();

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(dbConnection);
app.use(cors);
app.use(isAuthorized);
app.use('/graphql', graphqlHTTP);

app.get('/', (req, res) => {
  res.send('<h1>hello, reblog19 server.</h1>');
});

const PORT = process.env.PORT || 4000;

app.listen(4000, () => logger.info(`Server started on port ${PORT}.`));

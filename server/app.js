// Express
const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Database
const dbConnection = require('./middleware/db-connection');

// GraphQL
const graphqlHTTP = require('./graphql/http');

// Authorization
const { isAuthorized } = require('./middleware/authorization');

const app = express();

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

const { GraphQLObjectType } = require('graphql');
const { configQueries } = require('./config.query');
const { authorizationQueries } = require('./authorization.query');
const { userQueries } = require('./user.query');
const { postQueries } = require('./post.query');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...configQueries,
    ...authorizationQueries,
    ...userQueries,
    ...postQueries
  }
});

module.exports = queryType;

const { GraphQLObjectType } = require('graphql');
const { configQueries } = require('./config.query');
const { authorizationQueries } = require('./authorization.query');
const { userQueries } = require('./user.query');
const { categoryQueries } = require('./category.query')
const { postQueries } = require('./post.query');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...configQueries,
    ...authorizationQueries,
    ...userQueries,
    ...categoryQueries,
    ...postQueries
  }
});

module.exports = queryType;

const { GraphQLObjectType } = require('graphql');
const { configQueries } = require('./config.query');
const { userQueries } = require('./user.query');
const { postQueries } = require('./post.query');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...configQueries,
    ...userQueries,
    ...postQueries
  }
});

module.exports = queryType;

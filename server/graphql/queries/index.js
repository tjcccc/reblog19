const { GraphQLObjectType } = require('graphql');
const { configQueries } = require('./config.query');
const { postQueries } = require('./post.query');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...configQueries,
    ...postQueries
  }
});

module.exports = queryType;

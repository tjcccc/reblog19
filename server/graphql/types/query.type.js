const { GraphQLObjectType } = require('graphql');
const { configQueries } = require('../types/config.type');
const { postQueries } = require('../types/post.type');

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    ...configQueries,
    ...postQueries
  }
});

module.exports = QueryType;

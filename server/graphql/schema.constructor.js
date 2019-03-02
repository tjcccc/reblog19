const { GraphQLSchema } = require('graphql');
const QueryType = require('./types/query.type');

module.exports = new GraphQLSchema({
  query: QueryType
});

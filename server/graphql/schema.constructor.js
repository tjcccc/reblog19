const { GraphQLSchema } = require('graphql');
const queryType = require('./queries/index');

module.exports = new GraphQLSchema({
  query: queryType
});

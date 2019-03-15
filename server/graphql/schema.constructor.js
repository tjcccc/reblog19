const { GraphQLSchema } = require('graphql');
const queryType = require('./queries/index');
const mutationType = require('./mutations/index');

module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

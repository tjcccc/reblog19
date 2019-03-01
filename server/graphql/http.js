const graphqlHTTP = require('express-graphql');
const rootSchema = require('./schemas/index');
const rootResolvers = require('./resolvers/index');

module.exports = graphqlHTTP({
  schema: rootSchema,
  rootValue: rootResolvers,
  graphiql: true,
  formatError(error) {
    if (!error.originalError) {
      return error;
    }
    const data = error.originalError.data;
    const message = error.message || 'An error occurred.';
    const code = error.originalError.code || 500;
    return {
      message: message,
      status: code,
      data: data
    };
  }
})

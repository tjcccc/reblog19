const { graphqlHTTP } = require('express-graphql');
const schemaConstructor = require('./schema.constructor');

module.exports = graphqlHTTP({
  schema: schemaConstructor,
  graphiql: false,
  customFormatErrorFn: error => {
    if (!error.originalError) {
      return error;
    }
    const locations = error.locations;
    const data = error.originalError.data;
    const message = error.message || 'An error occurred.';
    const code = error.originalError.code || 500;
    const path = error.path;
    return {
      message: message,
      locations: locations,
      status: code,
      data: data,
      path: path
    };
  }
})

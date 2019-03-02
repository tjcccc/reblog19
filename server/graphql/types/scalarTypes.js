const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const scalarTypes = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      // value from the client
      return new Date(value);
    },
    serialize(value) {
      // value sent to the client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // ast value is always in string format
        return new Date(ast.value)
      }
      return null;
    },
  }),
};

module.exports = scalarTypes;

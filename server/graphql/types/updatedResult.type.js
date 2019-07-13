const { GraphQLObjectType, GraphQLInt, GraphQLBoolean } = require('graphql');

const UpdatedResultType = new GraphQLObjectType({
  name: 'UpdatedResult',
  fields: () => ({
    n: { type: GraphQLInt },
    nModified: { type: GraphQLInt },
    ok: { type: GraphQLBoolean }
  })
});

module.exports.UpdatedResultType = UpdatedResultType;

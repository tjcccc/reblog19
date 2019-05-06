const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

const TagType = new GraphQLObjectType({
  name: 'TagType',
  fields: () => ({
    _id: { type: GraphQLID },
    label: { type: GraphQLString },
    count: { type: GraphQLInt }
  })
});

module.exports.TagType = TagType;

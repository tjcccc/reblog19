const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: () => ({
    _id: { type: GraphQLID },
    order_id: { type: GraphQLInt },
    label: { type: GraphQLString },
    count: { type: GraphQLInt }
  })
});

module.exports.CategoryType = CategoryType;

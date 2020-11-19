const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const ConfigType = new GraphQLObjectType({
  name: 'Config',
  fields: () => ({
    _id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    blog_name: { type: GraphQLString },
    author_name: { type: GraphQLString },
    about: { type: GraphQLString }
  })
});

module.exports.ConfigType = ConfigType;

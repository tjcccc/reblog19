const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = require('graphql');
const scalarTypes = require('./scalarTypes');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    create_time: { type: scalarTypes.Date },
    post_time: { type: scalarTypes.Date },
    update_time: { type: scalarTypes.Date },
    content: { type: GraphQLString },
    status: { type: GraphQLInt },
    categories: { type: new GraphQLList(GraphQLID) },
    tags: { type: new GraphQLList(GraphQLID) },
    view_count: { type: GraphQLInt },
    like_count: { type: GraphQLInt }
  })
});

const PostInput = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    content: { type: GraphQLString },
    status: { type: GraphQLInt },
    categories: { type: new GraphQLList(GraphQLID) },
    tags: { type: new GraphQLList(GraphQLID) }
  }
});

module.exports.PostType = PostType;
module.exports.PostInput = PostInput;

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = require('graphql');
const scalarTypes = require('./scalarTypes');
const { CategoryType } = require('./category.type');

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
    category_ids: { type: new GraphQLList(GraphQLID) },
    tags: { type: new GraphQLList(GraphQLString) },
    view_count: { type: GraphQLInt },
    like_count: { type: GraphQLInt },
    categories: { type: new GraphQLList(CategoryType) },
  })
});

const PostInput = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    status: { type: GraphQLInt },
    category_ids: { type: new GraphQLList(GraphQLID) },
    tags: { type: new GraphQLList(GraphQLString) }
  }
});

module.exports.PostType = PostType;
module.exports.PostInput = PostInput;

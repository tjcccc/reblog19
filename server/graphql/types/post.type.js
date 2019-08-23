const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = require('graphql');
const scalarTypes = require('./scalarTypes');
const { CategoryType } = require('./category.type');
const { TagType } = require('./tag.type');

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
    tag_ids: { type: new GraphQLList(GraphQLID) },
    view_count: { type: GraphQLInt },
    like_count: { type: GraphQLInt },
    categories: { type: new GraphQLList(CategoryType) },
    tags: { type: new GraphQLList(TagType) }
  })
});

const PostInput = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    status: { type: GraphQLInt },
    category_ids: { type: new GraphQLList(GraphQLID) },
    tag_ids: { type: new GraphQLList(GraphQLID) }
  }
});

module.exports.PostType = PostType;
module.exports.PostInput = PostInput;

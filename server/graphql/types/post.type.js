const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = require('graphql');
const scalarTypes = require('./scalarTypes');
const Post = require('../../entities/post');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middlewares/logger');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    create_time: { type: scalarTypes.Date },
    post_time: { type: scalarTypes.Date },
    update_time: { type: scalarTypes.Date },
    content: { type: GraphQLString },
    state: { type: GraphQLInt },
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
    state: { type: GraphQLInt },
    categories: { type: new GraphQLList(GraphQLID) },
    tags: { type: new GraphQLList(GraphQLID) }
  }
});

const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    args: null,
    resolve: async () => {
      try {
        const result = await Post.find().limit(10);
        return result.map(post => {
          return { ...post._doc };
        });
      }
      catch(err) {
        logger.info(err);
        throw err;
      }
    }
  },
  createPost: {
    type: PostType,
    args: {
      newPost: { type: PostInput }
    },
    resolve: (_, args) => {
      const post = new Post({
        _id: new ObjectId(),
        title: 'New title',
        create_time: new Date().toISOString(),
        post_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
        content: args.newPost.content,
        state: args.newPost.state,
        categories: args.newPost.categories,
        tags: args.newPost.tags,
        view_count: 0,
        like_count: 0
      });
      return post.save()
        .then(result => {
          logger.info(result);
          return { ...result._doc };
        }).catch(err => {
          logger.error(err);
          throw err;
        });
    }
  },
  updateTitle: {
    type: PostType,
    args: {
      _id: { type: GraphQLID },
      title: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.findOneAndUpdate({ _id: args._id }, { title: args.title });
        logger.info(result._doc);
        return { ...result._doc };
      }
      catch (err) {
        logger.error(err);
        throw err;
      }
    }
  }
}

module.exports.PostType = PostType;
module.exports.postQueries = postQueries;

const { GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const { PostType } = require('../types/post.type');
const Post = require('../../entities/post');
const logger = require('../../middleware/logger');

const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    args: {
      skip: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      status: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.find({
          status: args.status !== 0 && args.status !== 1  ? { $ne: args.status } : args.status
        }).sort({ post_time: -1 }).skip(args.skip).limit(args.limit);
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
  postsByCategory: {
    type: new GraphQLList(PostType),
    args: {
      skip: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      categoryId: { type: GraphQLString },
      status: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.find({
          categories: { $all: [args.categoryId] },
          status: args.status !== 0 && args.status !== 1 ? { $ne: args.status } : args.status
        }).sort({ post_time: -1 }).skip(args.skip).limit(args.limit);
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
  postsByTag: {
    type: new GraphQLList(PostType),
    args: {
      skip: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      tagId: { type: GraphQLString },
      status: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.find({
          tags: { $all: [args.tagId] },
          status: args.status !== 0 && args.status !== 1 ? { $ne: args.status } : args.status
        }).sort({ post_time: -1 }).skip(args.skip).limit(args.limit);
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
  post: {
    type: PostType,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.findOne({ _id: args.id });
        return result._doc;
      }
      catch(err) {
        logger.info(err);
        // return empty
        return {};
        // throw err;
      }
    }
  }
}

module.exports.postQueries = postQueries;

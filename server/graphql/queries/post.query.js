const { GraphQLList, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql');
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
        logger.error(err);
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
          category_ids: { $all: [args.categoryId] },
          status: args.status !== 0 && args.status !== 1 ? { $ne: args.status } : args.status
        }).sort({ post_time: -1 }).skip(args.skip).limit(args.limit);
        return result.map(post => {
          return { ...post._doc };
        });
      }
      catch(err) {
        logger.error(err);
        throw err;
      }
    }
  },
  postsWithNoCategory: {
    type: new GraphQLList(PostType),
    args: {
      skip: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      status: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.find({
          category_ids: { $size: 0 },
          status: args.status !== 0 && args.status !== 1 ? { $ne: args.status } : args.status
        }).sort({ post_time: -1 }).skip(args.skip).limit(args.limit);
        return result.map(post => {
          return { ...post._doc };
        });
      }
      catch(err) {
        logger.error(err);
        throw err;
      }
    }
  },
  uncategorizedPostsCount: {
    type: GraphQLInt,
    args: {
      status: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.count({
          category_ids: { $size: 0 },
          status: args.status !== 0 && args.status !== 1 ? { $ne: args.status } : args.status
        });
        return result;
      }
      catch(err) {
        logger.error(err);
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
          tag_ids: { $all: [args.tagId] },
          status: args.status !== 0 && args.status !== 1 ? { $ne: args.status } : args.status
        }).sort({ post_time: -1 }).skip(args.skip).limit(args.limit);
        return result.map(post => {
          return { ...post._doc };
        });
      }
      catch(err) {
        logger.error(err);
        throw err;
      }
    }
  },
  post: {
    type: PostType,
    args: {
      _id: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.findOne({ _id: args._id }).populate('categories');

        // result._doc doesn't have vitural fields, use result.
        return result;
      }
      catch(err) {
        logger.error(err);
        // return empty
        return {};
        // throw err;
      }
    }
  },
  postExistence: {
    type: GraphQLBoolean,
    args: {
      _id: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        if (!args._id || args._id === undefined) {
          return false;
        }
        const result = await Post.count({ _id: args._id });
        return result > 0;
      }
      catch(err) {
        logger.error(err);
        return false;
      }
    }
  }
}

module.exports.postQueries = postQueries;

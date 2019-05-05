const { GraphQLList, GraphQLInt } = require('graphql');
const { PostType } = require('../types/post.type');
const Post = require('../../entities/post');
const logger = require('../../middleware/logger');

const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    args: {
      skip: { type: GraphQLInt },
      limit: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.find().sort({ post_time: -1 }).skip(args.skip).limit(args.limit);
        return result.map(post => {
          return { ...post._doc };
        });
      }
      catch(err) {
        logger.info(err);
        throw err;
      }
    }
  }
}

module.exports.postQueries = postQueries;

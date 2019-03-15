const { GraphQLList } = require('graphql');
const { PostType } = require('../types/post.type');
const Post = require('../../entities/post');
const logger = require('../../middlewares/logger');

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
  }
}

module.exports.postQueries = postQueries;

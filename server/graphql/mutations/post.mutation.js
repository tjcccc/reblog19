const { GraphQLID, GraphQLString } = require('graphql');
const { PostType, PostInput } = require('../types/post.type');
const Post = require('../../entities/post');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middleware/logger');

const postMutations = {
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

module.exports.postMutations = postMutations;

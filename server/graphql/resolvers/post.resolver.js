const Post = require('../../entities/post');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middlewares/logger');

module.exports = {
  // Return first 10 posts.
  posts: async () => {
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
  },
  createPost: (args) => {
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
  },
  // updateTitle: (args) => {
  //   return Post.findOneAndUpdate({ _id: args._id }, { title: args.title }).then(result => {
  //     logger.info(result._doc);
  //     return { ...result._doc };
  //   }).catch(err => {
  //     logger.error(err);
  //     throw err;
  //   });
  // }
  updateTitle: async (args) => {
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

const logger = require('../../middlewares/logger');
const Post = require('../../entities/post');
const ObjectId = require('mongoose').Types.ObjectId;

const tenPosts = Post.find().limit(10).then(posts => {
  return posts.map(post => {
    return { ...post._doc };
  });
}).catch(error => {
  logger.error(error);
  throw error;
});

module.exports = {
  posts: () => {
    return tenPosts;
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
      }).catch(error => {
        logger.error(error);
        throw error;
      });
  }
}

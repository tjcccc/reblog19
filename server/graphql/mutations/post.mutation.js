const { GraphQLID, GraphQLString } = require('graphql');
const { PostType, PostInput } = require('../types/post.type');
const Post = require('../../entities/post');
const Category = require('../../entities/category')
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middleware/logger');

const updateCategories = async () => {
  try {
    const categoriesResult = await Category.find();
    categoriesResult.map(async category => {
      const postsCount = await Post.find({ status: 1, categories: { $in: category._id } }).countDocuments();
      await Category.updateOne({ _id: category._id }, { $set: { count: postsCount } });
    });
  }
  catch (err) {
    logger.error(err);
    throw err;
  }
}

const postMutations = {
  createPost: {
    type: PostType,
    args: {
      newPost: { type: PostInput }
    },
    resolve: async (_, args) => {
      const post = new Post({
        _id: new ObjectId(),
        title: args.newPost.title,
        create_time: new Date().toISOString(),
        post_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
        content: args.newPost.content,
        status: args.newPost.status,
        categories: args.newPost.categories.map(category => new ObjectId(category)),
        tags: args.newPost.tags,
        view_count: 0,
        like_count: 0
      });
      return post.save()
        .then(async result => {
          logger.info(result);

          // Update categories for count
          await updateCategories();

          // Update tags for count

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

const { GraphQLID, GraphQLString } = require('graphql');
const { PostType, PostInput } = require('../types/post.type');
const Post = require('../../entities/post');
const Category = require('../../entities/category');
const Tag = require('../../entities/tag');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middleware/logger');

const updateCategories = async () => {
  try {
    const categoriesResult = await Category.find();
    categoriesResult.map(async category => {
      if (!category) {
        return;
      }
      const postsCount = await Post.find({ status: 1, category_ids: { $in: category._id } }).countDocuments();
      await Category.updateOne({ _id: category._id }, { $set: { count: postsCount } });
    });
  }
  catch (err) {
    logger.error(err);
    throw err;
  }
}

const updateTags = async () => {
  try {
    const tagsResult = await Tag.find();
    tagsResult.map(async tag => {
      const postsCount = await Post.find({ status: 1, tags: { $in: tag._id } }).countDocuments();
      await Tag.updateOne({ _id: tag._id }, { $set: { count: postsCount } });
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
        category_ids: args.newPost.category_ids,
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
          // await updateTags();

          return { ...result._doc };
        }).catch(err => {
          logger.error(err);
          throw err;
        });
    }
  },
  updatePost: {
    type: PostType,
    args: {
      post: { type: PostInput }
    },
    resolve: async (_, args) => {
      try {
        const result = await Post.findOneAndUpdate({ _id: args.post._id }, {
          title: args.post.title,
          content: args.post.content,
          status: args.post.status,
          category_ids: args.post.category_ids,
          tags: args.post.tags
        });
        logger.info(result._doc);
        return { ...result._doc };
      }
      catch (err) {
        logger.error(err);
        throw err;
      }
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

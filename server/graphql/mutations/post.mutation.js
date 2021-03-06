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
      const postsCount = await Post.find({ status: 1, tag_ids: { $in: tag._id } }).countDocuments();
      await Tag.updateOne({ _id: tag._id }, { $set: { count: postsCount } });
    });
  }
  catch (err) {
    logger.error(err);
    throw err;
  }
}

const getTagIdsByLabels = async (labels) => {
  if (labels === undefined || labels === null || labels.length < 1) {
    return [];
  }
  let tagIds = [];
  // logger.info(labels);
  await Promise.all(labels.map(async label => {
    if (label === undefined || label === null || label === '') {
      return;
    }
    const tagResult = await Tag.findOne({ label: label });
    if (tagResult !== undefined && tagResult !== null) {
      const tagDoc = tagResult._doc;
      tagIds.push(tagDoc._id);
      return;
    }
    const newTag = new Tag({
      _id: new ObjectId(),
      label: label,
      count: 0
    });
    const newTagSaveResult = await newTag.save();
    logger.info(newTagSaveResult);
    const newTagDoc = newTagSaveResult._doc;
    tagIds.push(newTagDoc._id);
  }));
  // logger.info(tagIds);
  return tagIds;
};

const postMutations = {
  createPost: {
    type: PostType,
    args: {
      newPost: { type: PostInput }
    },
    resolve: async (_, args) => {
      const tagIds = await getTagIdsByLabels(args.newPost.tagLabels);
      logger.info(tagIds);
      const post = new Post({
        _id: new ObjectId(),
        title: args.newPost.title,
        create_time: new Date().toISOString(),
        post_time: args.newPost.post_time,
        update_time: new Date().toISOString(),
        content: args.newPost.content,
        status: args.newPost.status,
        category_ids: args.newPost.category_ids,
        tag_ids: tagIds,
        view_count: 0,
        like_count: 0
      });
      return post.save()
        .then(async result => {
          logger.info(result);

          // Update categories for count
          await updateCategories();

          // Update tags for count
          await updateTags();

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
        const tagIds = await getTagIdsByLabels(args.post.tagLabels);
        // logger.info(tagIds);
        const result = await Post.findOneAndUpdate({ _id: args.post._id }, {
          title: args.post.title,
          content: args.post.content,
          status: args.post.status,
          post_time: args.post.post_time,
          update_time: args.post.update_time,
          category_ids: args.post.category_ids,
          tag_ids: tagIds
        });
        logger.info(result._doc);

        // Update categories for count
        await updateCategories();

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

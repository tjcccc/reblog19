const { GraphQLList } = require('graphql');
const { UpdatedResultType } = require('../types/updatedResult.type');
const Category = require('../../entities/category')
const Post = require('../../entities/post');
const logger = require('../../middleware/logger');

const categoryMutations = {
  updateCategoryCount: {
    type: new GraphQLList(UpdatedResultType),
    args: null,
    resolve: async () => {
      try {
        const result = await Category.find();
        return result.map(async category => {
          const postsCount = await Post.find({ status: 1, categories: { $in: category._id } }).countDocuments();
          const updatedResult = await Category.updateOne({ _id : category._id }, { $set: { count: postsCount } });
          return { ...updatedResult };
        });
      }
      catch(err) {
        logger.error(err);
        throw err;
      }
    }
  }
}

module.exports.categoryMutations = categoryMutations;

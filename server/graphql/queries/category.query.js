const { GraphQLList } = require('graphql');
const { CategoryType } = require('../types/category.type');
const Category = require('../../entities/category');
const logger = require('../../middleware/logger');

const categoryQueries = {
  categories: {
    type: new GraphQLList(CategoryType),
    args: null,
    resolve: async () => {
      try {
        const result = await Category.find().sort({ order_id: 1 });
        return result.map(category => {
          return { ...category._doc };
        });
      }
      catch (err) {
        logger.error(err);
        throw err;
      }
    }
  }
}

module.exports.categoryQueries = categoryQueries;

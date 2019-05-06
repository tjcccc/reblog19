const { GraphQLList } = require('graphql');
const { TagType } = require('../types/tag.type');
const Tag = require('../../entities/tag');
const logger = require('../../middleware/logger');

const tagQueries = {
  tags: {
    type: new GraphQLList(TagType),
    args: null,
    resolve: async () => {
      try {
        const result = await Tag.find().sort({ _id: 1 });
        return result.map(tag => {
          return { ...tag._doc };
        });
      }
      catch (err) {
        logger.error(err);
        throw err;
      }
    }
  }
}

module.exports.tagQueries = tagQueries;

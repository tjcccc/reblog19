const { GraphQLString } = require('graphql');
const { ConfigType } = require('../types/config.type');
const Config = require('../../entities/config');
const logger = require('../../middleware/logger');

const configMutations = {
  updateBlogName: {
    type: ConfigType,
    args: {
      title: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        const result = await Config.findOneAndUpdate({}, { blog_name: args.blogName });
        logger.info(result._doc);
        return { ...result._doc };
      } catch(err) {
        logger.error(err);
        throw err;
      }
    }
  },
  updateAbout: {
    type: ConfigType,
    args: {
      about: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        const result = await Config.findOneAndUpdate({}, { about: args.about });
        logger.info(result._doc);
        return { ...result._doc };
      } catch(err) {
        logger.error(err);
        throw err;
      }
    }
  }
}

module.exports.configMutations = configMutations;

const { GraphQLString } = require('graphql');
const { ConfigType } = require('../types/config.type');
const Config = require('../../entities/config');
const logger = require('../../middlewares/logger');

const configQueries = {
  config: {
    type: ConfigType,
    args: null,
    resolve: async () => {
      try {
        const config = await Config.findOne();
        return config._doc;
      }
      catch (err) {
        logger.error(err);
        throw err;
      }
    }
  },
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
      }
      catch(err) {
        logger.error(err);
        throw err;
      }
    }
  }
}

module.exports.configQueries = configQueries;

const logger = require('../../middlewares/logger');
const Config = require('../../entities/config');

module.exports = {
  config: async () => {
    try {
      const config = await Config.findOne();
      return config._doc;
    }
    catch (err) {
      logger.error(err);
      throw err;
    }
  },
  updateBlogName: async (args) => {
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

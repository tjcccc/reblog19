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
  }
}

module.exports.configQueries = configQueries;

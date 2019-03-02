const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const Config = require('../../entities/config');
const logger = require('../../middlewares/logger');

const ConfigType = new GraphQLObjectType({
  name: 'Config',
  fields: () => ({
    _id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    blog_name: { type: GraphQLString },
    author_name: { type: GraphQLString }
  })
});

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

module.exports.ConfigType = ConfigType;
module.exports.configQueries = configQueries;

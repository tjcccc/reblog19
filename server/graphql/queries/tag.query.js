const { GraphQLList, GraphQLString } = require('graphql');
const { TagType } = require('../types/tag.type');
const Tag = require('../../entities/tag');
// const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middleware/logger');

const findTag = async (label) => {
  try {
    const result = await Tag.findOne({ label: label });
    logger.info(result);
    return { ...result._doc };
  }
  catch(err) {
    logger.error(err);
    return {};
  }
}

const tagQueries = {
  tags: {
    type: new GraphQLList(TagType),
    args: null,
    resolve: async () => {
      try {
        const result = await Tag.find().sort({ count: -1 }).limit(20);
        return result.map(tag => {
          return { ...tag._doc };
        });
      }
      catch (err) {
        logger.error(err);
        throw err;
      }
    }
  },
  tag: {
    type: TagType,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        const result = await Tag.findOne({ _id: args.id });
        return result._doc;
      }
      catch(err) {
        logger.info(err);
        // return empty
        return {};
        // throw err;
      }
    }
  },
  tagByLabel: {
    type: TagType,
    args: {
      label: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      return await findTag(args.label);
    }
  }
}

module.exports.tagQueries = tagQueries;

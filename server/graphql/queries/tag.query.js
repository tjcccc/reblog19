const { GraphQLList, GraphQLString } = require('graphql');
const { TagType } = require('../types/tag.type');
const Tag = require('../../entities/tag');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middleware/logger');

const findOrCreateTag = async (label) => {
  try {
    const result = await Tag.findOne({ label: label });
    logger.info(result);
    if (result !== null) {
      return result;
    }

    const newTag = new Tag({
      _id: new ObjectId(),
      label: label,
      count: 0
    });
    logger.info(newTag);
    return newTag.save()
      .then(async result => {
        logger.info(result);
        return { ...result._doc };
      }).catch(err => {
        logger.error(err);
        throw err;
      });
  }
  catch(err) {
    logger.error(err);
    // return empty
    return {};
    // throw err;
  }
};

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
      return await findOrCreateTag(args.label);
    }
  }
}

module.exports.tagQueries = tagQueries;

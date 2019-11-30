const { GraphQLID, GraphQLString } = require('graphql');
const { TagType } = require('../types/tag.type');
const Tag = require('../../entities/tag');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middleware/logger');

const findOrCreateTag = async (label) => {
  try {
    const result = await Tag.findOne({ label: label });
    logger.info(result);
    if (result !== null) {
      return { ...result._doc };
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

const tagMutations = {
  createTag: {
    type: TagType,
    args: {
      label: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      const tag = new Tag({
        _id: new ObjectId(),
        label: args.label,
        count: 0
      });
      return tag.save()
        .then(async result => {
          logger.info(result);

          return { ...result._doc };
        }).catch(err => {
          logger.error(err);
          throw err;
        });
    }
  },
  oldOrNewTagByLabel : {
    type: TagType,
    args: {
      label: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      return await findOrCreateTag(args.label);
    }
  }
}

module.exports.tagMutations = tagMutations;

const { GraphQLID, GraphQLString } = require('graphql');
const { TagType } = require('../types/tag.type');
const Tag = require('../../entities/tag');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../middleware/logger');

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

}

module.exports.tagMutations = tagMutations;

const { GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const { UserType } = require('../types/user.type');
const User = require('../../entities/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const logger = require('../../middlewares/logger');

const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    args: null,
    resolve: async () => {
      try {
        const result = await User.find().limit(100);
        return result.map(user => {
          return { ...user._doc };
        });
      }
      catch (err) {
        logger.error(err);
        throw err;
      }
    }
  },
  updatePassword: {
    type: UserType,
    args: {
      _id: { type: GraphQLID },
      rawPassword: { type: GraphQLString },
      repeatedRawPassword: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      if (args.rawPassword != args.repeatedRawPassword) {
        logger.error('Second paswword input is not identitified.')
        return {
          error: 'Update failed. Make sure that your seconed password input is same as the first one.'
        }
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const password = bcrypt.hashSync(args.rawPassword, salt);
      try {
        const result = await User.findOneAndUpdate({ _id: args._id }, { password: password });
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

module.exports.userQueries = userQueries;

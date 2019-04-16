const logger = require('../../middleware/logger');
const { GraphQLString, GraphQLList } = require('graphql');
const { UserType } = require('../types/user.type');
const { AuthorizationType } = require('../types/authorization.type');
const User = require('../../entities/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../keys');

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
  login: {
    type: AuthorizationType,
    args: {
      mail: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      try {
        // Match user's password.
        const user = await User.findOne({ mail: args.mail });
        const isPasswordIdentified = bcrypt.compareSync(args.password, user.password);
        if (!isPasswordIdentified) {
          logger.error('Password is incorrect.');
        }

        // Token
        const token = jwt.sign({userId: user._id, email: user.mail }, secretKey, { expiresIn: '12h' });

        const authorizationData = {
          userId: user ? user._id : null,
          userLevel: user ? user.level : -1,
          isLoginSuccessful: isPasswordIdentified,
          loginTime: isPasswordIdentified ? new Date().toISOString() : null,
          token: isPasswordIdentified ? token : '',
          tokenExpiration: isPasswordIdentified ? 1 : 0
        };

        return authorizationData;
      }
      catch(err) {
        logger.error(err);
        logger.error('User dose not exist.');
        return {
          userId: null,
          userLevel: -1,
          isLoginSuccessful: false,
          loginTime: null,
          token: '',
          tokenExpiration: 0
        }
      }
    }
  }
}

module.exports.userQueries = userQueries;

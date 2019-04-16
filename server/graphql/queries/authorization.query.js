const { GraphQLString } = require('graphql');
const { UserType } = require('../types/user.type');
const User = require('../../entities/user');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../keys');
const logger = require('../../middleware/logger');

const authorizationQueries = {
  authorization: {
    type: UserType,
    args: {
      token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
      const inexistentUser = {
        _id: '',
        username: '',
        mail: '',
        level: -1
      };
      try {
        logger.info(args.token);
        const decodedToken = jwt.verify(args.token, secretKey);
        const userId = decodedToken.userId;
        const user = await User.findOne({ _id: userId });
        return user;
      }
      catch(err) {
        logger.error(err);
        logger.error('User dose not exist.');
        return inexistentUser;
      }
    }
  }
}

module.exports.authorizationQueries = authorizationQueries;

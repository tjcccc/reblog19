const logger = require('../../middleware/logger');
const { UserType, PasswordInput } = require('../types/user.type');
const User = require('../../entities/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userMutations = {
  updatePassword: {
    type: UserType,
    args: {
      passwordInput: { type: PasswordInput }
    },
    resolve: async (_, args) => {
      if (args.passwordInput.rawPassword != args.passwordInput.repeatedRawPassword) {
        logger.error('Second paswword input is not identitified.')
        return {
          error: 'Update failed. Make sure that your seconed password input is same as the first one.'
        }
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const password = bcrypt.hashSync(args.passwordInput.rawPassword, salt);
      try {
        const result = await User.findOneAndUpdate({ _id: args.passwordInput._id }, { password: password });
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

module.exports.userMutations = userMutations;

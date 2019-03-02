const configResolver = require('./config.resolver');
const postResolver = require('./post.resolver');

const resolvers = {
  ...configResolver,
  ...postResolver
}

module.exports = resolvers;

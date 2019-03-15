const { GraphQLObjectType } = require('graphql');
const { configMutations } = require('./config.mutation');
const { userMutations } = require('./user.mutation');
const { postMutations } = require('./post.mutation');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...configMutations,
    ...userMutations,
    ...postMutations
  }
});

module.exports = mutationType;

const { GraphQLObjectType } = require('graphql');
const { configMutations } = require('./config.mutation');
const { userMutations } = require('./user.mutation');
const { postMutations } = require('./post.mutation');
const { categoryMutations } = require('./category.mutation');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...configMutations,
    ...userMutations,
    ...postMutations,
    ...categoryMutations
  }
});

module.exports = mutationType;

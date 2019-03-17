const { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLString, GraphQLInt } = require('graphql');
const scalarTypes = require('./scalarTypes');

const AuthorizationType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    userId: { type: GraphQLID },
    userLevel: { type: GraphQLInt },
    isLoginSuccessful: { type: GraphQLBoolean },
    loginTime: { type: scalarTypes.Date },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt }
  })
});

module.exports.AuthorizationType = AuthorizationType;

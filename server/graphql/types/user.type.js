const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLInputObjectType } = require('graphql');
const scalarTypes = require('./scalarTypes');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    mail: { type: GraphQLString },
    password: { type: GraphQLString },
    level: { type: GraphQLInt },
    create_time: { type: scalarTypes.Date },
    update_time: { type: scalarTypes.Date }
  })
});

const PasswordInput = new GraphQLInputObjectType({
  name: 'PasswordInput',
  fields: {
    _id: { type: GraphQLID },
    rawPassword: { type: GraphQLString },
    repeatedRawPassword: { type: GraphQLString }
  }
});

module.exports.UserType = UserType;
module.exports.PasswordInput = PasswordInput;

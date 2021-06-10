const graphql = require('graphql');
const { GraphQLObjectType,
GraphQLInt } = graphql;
const UserType = require('./UserType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: { 
    currentUser: {
      type: UserType,
      resolve(parent, args, req) {
        return req.user; 
      }
    }
  }
});

module.exports = RootQueryType;

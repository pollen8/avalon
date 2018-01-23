const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

module.exports = TeamType;

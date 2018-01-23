const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
} = graphql;

const VoteType = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: { type: GraphQLString },
    roundId: { type: GraphQLString },
    playerId: { type: GraphQLString },
    accept: { type: GraphQLBoolean },
  })
})

module.exports = VoteType;

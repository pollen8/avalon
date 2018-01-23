const graphql = require('graphql');
const TeamType = require('./teamType');
const axios = require('axios');
const VoteType = require('./voteType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const QuestRoundType = new GraphQLObjectType({
  name: 'QuestRound',
  fields: () => ({
    id: { type: GraphQLString },
    questId: { type: GraphQLString },
    roundNumber: { type: GraphQLInt },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/votes?roundId=${parentValue.id}`)
          .then((res) => res.data)
      }
    }
  })
})


module.exports = QuestRoundType;

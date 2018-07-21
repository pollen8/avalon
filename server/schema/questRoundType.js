const graphql = require('graphql');
const TeamType = require('./teamType');
const axios = require('axios');
const VoteType = require('./voteType');

const uri = 'http://localhost:4001';


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
        return axios.get(`${uri}/votes?roundId=${parentValue.id}`)
          .then((res) => res.data)
      }
    }
  })
})


module.exports = QuestRoundType;

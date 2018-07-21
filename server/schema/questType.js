const graphql = require('graphql');
const TeamType = require('./teamType');
const axios = require('axios');
const QuestRound = require('./questRoundType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = graphql;

const uri = 'http://localhost:4001';


const QuestType = new GraphQLObjectType({
  name: 'Quest',
  fields: () => ({
    id: { type: GraphQLString },
    gameId: { type: GraphQLString },
    winner: { type: TeamType },
    rounds: {
      type: new GraphQLList(QuestRound),
      resolve(parentValue, args) {
        return axios.get(`${uri}/rounds?questId=${parentValue.id}`)
          .then((res) => res.data);
      }
    }
  })
});

module.exports = QuestType;

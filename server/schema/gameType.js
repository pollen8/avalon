
const graphql = require('graphql');
const axios = require('axios');
const PlayerType = require('./playerType');
const QuestType = require('./questType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const uri = 'http://localhost:4001';

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    // date: { type: GraphQLDate },
    numberOfPlayers: { type: GraphQLInt },
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parentValue) {
        return axios.get(`${uri}/players?gameId=${parentValue.id}`)
          .then(res => {
            console.log('games players', res.data);
            return res.data;
          })
          .catch(e => console.log(e))
      }
    },
    quests: {
      type: new GraphQLList(QuestType),
      resolve(parentValue) {
        return axios.get(`${uri}/games/${parentValue.id}/quests`)
          .then(res => res.data)
          .catch(e => console.log(e))
      }
    },
  })
});

module.exports = GameType;

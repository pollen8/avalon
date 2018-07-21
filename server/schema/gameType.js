
const graphql = require('graphql');
const axios = require('axios');
const PlayerType = require('./playerType');
const QuestType = require('./questType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLDate,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
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
      resolve(parentValue, args) {
        return axios.get(`${uri}/games/${parentValue.id}/players`)
          .then(res => res.data)
      }
    },
    quests: {
      type: new GraphQLList(QuestType),
      resolve(parentValue, args) {
        return axios.get(`${uri}/games/${parentValue.id}/quests`)
          .then(res => res.data)
      }
    },
  })
});

module.exports = GameType;


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
        return axios.get(`http://localhost:3000/games/${parentValue.id}/players`)
          .then(res => res.data)
      }
    },
    quests: {
      type: new GraphQLList(QuestType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/games/${parentValue.id}/quests`)
          .then(res => res.data)
      }
    },
  })
});

module.exports = GameType;

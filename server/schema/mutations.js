const GameType = require('./gameType');
const PlayerType = require('./playerType');
const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGame: {
      type: GameType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { name }) {
        return axios.post('http://localhost:3000/games', { name })
          .then(res => res.data);
      }
    },
    deleteGame: {
      type: GameType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/games/${id}`)
          .then(res => res.data);
      }
    },
    addPlayerToGame: {
      type: PlayerType,
      args: {
        gameId: { type: GraphQLString },
        id: { type: GraphQLString }
      },
      resolve(parentValue, { gameId, id }) {
        return axios.post(`http://localhost:3000/player`, {
          gameId,
          id,
        }).then(res => res.data);
      }
    }
  }
});

module.exports = mutation;
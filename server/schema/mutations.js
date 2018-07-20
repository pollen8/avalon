const GameType = require('./gameType');
const PlayerType = require('./playerType');
const graphql = require('graphql');
const axios = require('axios');

const uri = 'http://localhost:4001';

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
        console.log('add game', { name });
        return axios.post(`${uri}/games`, { name })
          .then(res => res.data)
          .catch(e => console.log('error', e));
      }
    },
    deleteGame: {
      type: GameType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios.delete(`${uri}/games/${id}`)
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
        return axios.post(`${uri}/player`, {
          gameId,
          id,
        }).then(res => res.data);
      }
    }
  }
});

module.exports = mutation;
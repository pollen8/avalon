const GameType = require('./gameType');
const PlayerType = require('./playerType');
const UserType = require('./userType');
const graphql = require('graphql');
const axios = require('axios');

const uri = 'http://localhost:4001';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, data) {
        return axios.post(`${uri}/users`, data)
          .then(res => res.data)
          .catch(e => console.log('error', e));
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios.delete(`${uri}/users/${id}`)
          .then(res => res.data);
      }
    },
    addGame: {
      type: GameType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        numberOfPlayers: { type: GraphQLInt },
        players: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parentValue, { players, ...data }) {
        console.log('add game', data);
        console.log('players', players);

        return (async () => {
          try {
            const res = await axios.post(`${uri}/games`, data);
            console.log('add game res', res.data);
            await Promise.all(players.map(async (p) => {
              const player = {
                userId: p,
                gameId: res.data.id,
              }
              console.log('player', player);
              return await axios.post(`${uri}/players`, player);
            }));
            console.log('return game res', res.data);
            return res.data;
          } catch (e) {
            console.log('error', e);
          }
        })();

        // return axios.post(`${uri}/games`, data)
        //   .then(res => {
        //     console.log('add game', res.data);
        //     return res.data;
        //   })
        //   .catch(e => console.log('error', e));
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
    },
    updatePlayerInGame: {
      type: PlayerType,
      args: {
        id: { type: GraphQLString },
        user: { type: GraphQLString },
        character: { type: GraphQLString },
      },
      resolve(parentValue, { id, user, character }) {
        console.log('updatePlayerInGame', id, user, character, `${uri}/player/${id}`);
        return axios.put(`${uri}/player/${id}`, {
          id,
          user,
          character,
        }).then(res => res.data)
          .catch(e => console.log('error', e.error));
      }
    }
  }
});

module.exports = mutation;
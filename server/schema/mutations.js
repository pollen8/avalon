const GameType = require('./gameType');
const PlayerType = require('./playerType');
const UserType = require('./userType');
const QuestType = require('./questType');
const graphql = require('graphql');
const axios = require('axios');
const TeamType = require('./teamType');
const QuestRound = require('./questRoundType');

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
        userId: { type: GraphQLString },
        gameId: { type: GraphQLString },
        characterId: { type: GraphQLString },
      },
      resolve(parentValue, { id, userId, characterId, gameId }) {
        const player = {
          id,
          gameId,
          userId,
          characterId,
        };
        return axios.put(`${uri}/players/${id}`, player)
          .then(res => {
            return {
              ...player,
              ...res.data
            };
          })
          .catch(e => console.log('error', e));
      }
    },
    addQuest: {
      type: QuestType,
      args: {
        id: { type: GraphQLString },
        gameId: { type: GraphQLString },
        winner: { type: GraphQLString },
      },
      resolve(parentValue, { id, gameId, winner, rounds }) {
        const round = {
          id, gameId, winner, rounds,
        };
        return axios.post(`${uri}/quests/`, round)
          .then(res => {
            return {
              ...round,
              ...res.data
            };
          })
          .catch(e => console.log('error', e));
      }
    }
  }
});

module.exports = mutation;

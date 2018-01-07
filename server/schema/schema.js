const graphql = require('graphql');
const axios = require('axios');
const GraphQLDate = require('graphql-date');

const {
  GraphQLObjectType,
  GraphQLString,
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
    date: { type: GraphQLDate },
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

const CharacterType = new GraphQLObjectType({
  name: 'CharacterType',
  fields: () => ({
    id: { type: GraphQLString },
    isGood: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: GraphQLString },
    gameId: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${parentValue.userId}`)
          .then(res => res.data)
      }
    },
    character: {
      type: CharacterType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/characters/${parentValue.characterId}`)
          .then(res => res.data)
      }
    }
  })
})

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

const QuestType = new GraphQLObjectType({
  name: 'Quest',
  fields: () => ({
    id: { type: GraphQLString },
    gameId: { type: GraphQLString },
    winner: { type: TeamType },
    rounds: {
      type: new GraphQLList(QuestRound),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/rounds?questId=${parentValue.id}`)
          .then((res) => res.data)
      }
    }
  })
})

const QuestRound = new GraphQLObjectType({
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

const VoteType = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: { type: GraphQLString },
    roundId: { type: GraphQLString },
    playerId: { type: GraphQLString },
    accept: { type: GraphQLBoolean },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    games: {
      type: new GraphQLList(GameType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/games/`)
          .then(resp => resp.data);
      }
    },
    game: {
      type: GameType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/games/${args.id}`)
          .then(resp => resp.data);
      }
    },
    characters: {
      type: GraphQLList(CharacterType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/characters`)
          .then(resp => resp.data);
      }
    },
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/characters/${args.id}`)
          .then(resp => resp.data);
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users`)
          .then(resp => resp.data);
      }
    }
  }
});

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
    }
  }
});

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery
});
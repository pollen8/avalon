const graphql = require('graphql');
const axios = require('axios');
const GraphQLDate = require('graphql-date');
const mutation = require('./mutations');
const GameType = require('./gameType');
const CharacterType = require('./characterType');
const UserType = require('./userType');
const TeamType = require('./teamType');
const QuestRoundType = require('./questRoundType');
const VoteType = require('./voteType');

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    games: {
      type: new GraphQLList(GameType),
      resolve(parentValue, args) {
        return axios.get(`${uri}/games/`)
          .then(resp => resp.data);
      }
    },
    game: {
      type: GameType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`${uri}/games/${args.id}`)
          .then(resp => {
            return resp.data;
          })
          .catch((e) => console.log(e));
      }
    },
    characters: {
      type: GraphQLList(CharacterType),
      resolve(parentValue, args) {
        return axios.get(`${uri}/characters`)
          .then(resp => resp.data);
      }
    },
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`${uri}/characters/${args.id}`)
          .then(resp => resp.data);
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`${uri}/users`)
          .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery
});
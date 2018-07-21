

const graphql = require('graphql');
const axios = require('axios');
const UserType = require('./userType');
const CharacterType = require('./characterType');

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const uri = 'http://localhost:4001';

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: GraphQLString },
    gameId: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue, args) {
        return axios.get(`${uri}/users/${parentValue.userId}`)
          .then(res => res.data)
      }
    },
    character: {
      type: CharacterType,
      resolve(parentValue, args) {
        if (!parentValue.characterId) {
          return '';
        }
        return axios.get(`${uri}/characters/${parentValue.characterId}`)
          .then(res => res.data)
      }
    }
  })
})

module.exports = PlayerType;

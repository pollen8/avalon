

const graphql = require('graphql');
const axios = require('axios');
const UserType = require('./userType');
const CharacterType = require('./characterType');

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

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

module.exports = PlayerType;

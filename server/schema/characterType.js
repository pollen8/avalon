
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const CharacterType = new GraphQLObjectType({
  name: 'CharacterType',
  fields: () => ({
    id: { type: GraphQLString },
    isGood: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
})

module.exports = CharacterType;

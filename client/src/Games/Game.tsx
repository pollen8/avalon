import * as React from 'react';
import gql from 'graphql-tag';
import { graphql, QueryProps } from 'react-apollo';
import PlayerList, { IPlayer } from './PlayerList';
import { RouteComponentProps } from 'react-router';
import QuestList, { IQuest } from './QuestList';
import AddPlayer from './AddPlayer';
interface Request {
  id: string;
}
type InputProps = RouteComponentProps<Request>;

export interface IGame {
  id: string;
  name: string;
  players: IPlayer[];
  quests: IQuest[];
  numberOfPlayers: number;
}
interface Response {
  game: IGame;
}

type WrappedProps = Response & QueryProps;

const query = gql`query fetchGame($id: String!){
  game(id: $id) {
    id
    name
    numberOfPlayers
    quests {
      id
      rounds {
        roundNumber
        votes {
          id
          accept
          playerId
        }
      }
    }
    players {
      id
      character {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
}`
  ;

const withGame = graphql<Response, InputProps, WrappedProps>(query, {
  options: ({ match }) => ({
    variables: { id: match.params.id }
  }),
  props: ({ data }) => ({ ...data })
});

export default withGame(({ loading, game }) => {
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <h1>Game</h1>
      <p>Number of players: {game.numberOfPlayers}</p>
      <h2>Players</h2>
      <PlayerList players={game.players} />
      <AddPlayer />
      <h2>Quests</h2>
      <QuestList quests={game.quests} />
    </div>
  );

});

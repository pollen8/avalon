import * as React from 'react';
import gql from 'graphql-tag';
import { graphql, QueryProps } from 'react-apollo';
import PlayerList, { IPlayer } from './PlayerList';
import { RouteComponentProps } from 'react-router';
import QuestList, { IQuest } from './QuestList';

interface Request {
  id: string;
}
type InputProps = RouteComponentProps<Request>;

interface Response {
  game: {
    id: string;
    name: string;
    players: IPlayer[];
    quests: IQuest[];
  };
}

type WrappedProps = Response & QueryProps;

const query = gql`query fetchGame($id: String!){
  game(id: $id) {
    id
    name
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

export default withGame((props) => {
  if (props.loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <h1>Game</h1>
      <h2>Players</h2>
      <PlayerList players={props.game.players} />
      <h2>Quests</h2>
      <QuestList quests={props.game.quests} />
    </div>
  );

});

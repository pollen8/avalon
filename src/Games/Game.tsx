import * as React from 'react';
import gql from 'graphql-tag';
import { graphql, QueryProps } from 'react-apollo';
import PlayerList, { IPlayer } from './PlayerList';
import { RouteComponentProps } from 'react-router';

interface Request {
  id: string;
}
type InputProps = RouteComponentProps<Request>;

interface Response {
  game: {
    id: string;
    name: string;
    players: IPlayer[];
  };
}

type WrappedProps = Response & QueryProps;

const query = gql`query fetchGame($id: String!){
  game(id: $id) {
    id
    name
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
  console.log(props);
  if (props.loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <h1>Game</h1>
      <h2>Players</h2>
      <PlayerList players={props.game.players} />
    </div>
  );

});
// export default graphql(query, {
//   options: (props: Props) => { return { variables: { id: props.match.params.id } }; }
// })(Game);

// export default Game;

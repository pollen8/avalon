import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import AddPlayer from './AddPlayer';
import AssignCharacters from './AssignCharacters';
import PlayerList, { IPlayer } from './PlayerList';
import QuestList, { IQuest } from './QuestList';


const GET_GAME = gql`query fetchGame($id: String!){
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


export interface IGame {
  id: string;
  name: string;
  players: IPlayer[];
  quests: IQuest[];
  numberOfPlayers: number;
}
interface IResponse {
  game: IGame;
}

interface IInputProps {
  id: string;
}

interface IVariables {
  id: string;
}

type InputProps = IInputProps & RouteComponentProps<any>;

class GameQuery extends Query<IResponse, IVariables> { }

const Game: React.SFC<InputProps> = ({ match }) => {

  return (
    <GameQuery query={GET_GAME} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        console.log('game', data);
        if (loading) {
          return <p>Loadg</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        if (!data) {
          return;
        }
        return (
          <div>
            <h1>Game</h1>
            <p>Number of players: {data.game.numberOfPlayers}</p>
            <AssignCharacters game={data.game} />
            <h2>Players</h2>
            <PlayerList players={data.game.players} />
            <AddPlayer />
            <h2>Quests</h2>
            <QuestList quests={data.game.quests} />
          </div>
        );
      }}
    </GameQuery>
  );
}

export default Game;

// const HERO_QUERY = gql`
//   query GetCharacter($episode: Episode!) {
//     hero(episode: $episode) {
//       name
//       id
//       friends {
//         name
//         id
//         appearsIn
//       }
//     }
//   }
// `;

// interface IHero {
//   name: string;
//   id: string;
//   appearsIn: string[];
//   friends: IHero[];
// };

// interface IResponse {
//   hero: IHero;
// };

// interface IVariables {
//   episode: string;
// };

// // Note that the first parameter here is an empty Object, which means we're
// // not checking incoming props for type safety in this example. The next
// // example (in the "Options" section) shows how the type safety of incoming
// // props can be ensured.
// const withCharacter = graphql<{}, IResponse, IVariables>(HERO_QUERY, {
//   options: () => ({
//     variables: { episode: "JEDI" }
//   })
// });


// export default withCharacter(({ data }) => {
//   console.log('data', data);
//   // if (loading) {
//   //   return <div>Loading</div>;
//   // }
//   // if (error) {
//   //   return <h1>ERROR</h1>;
//   // }
//   return <p>here</p>;
// });
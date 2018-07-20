import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import AddPlayer from './AddPlayer';
import PlayerList, { IPlayer } from './PlayerList';
import QuestList, { IQuest } from './QuestList';


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

const withGame = graphql<InputProps, IResponse, IVariables>(query, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id,
    }
  }),
  props: ({ data }) => ({ ...data })
});

export default withGame(({ data }) => {
  console.log('data', data);
  // if (loading) {
  //   return <p>Loading</p>;
  // }
  // if (error) {
  //   return <p>Error</p>;
  // }
  // return <p>gaem.p..</p>;
  return (
    <div>
      <h1>Game</h1>
      {/* <p>Number of players: {game.numberOfPlayers}</p> */}
      <h2>Players</h2>
      {/* <PlayerList players={game.players} /> */}
      <PlayerList players={[]} />
      <AddPlayer />
      <h2>Quests</h2>
      {/* <QuestList quests={game.quests} /> */}
      <QuestList quests={[]} />
    </div>
  );

});


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
import * as React from 'react';
import { GameQuery, GET_GAME, InputProps } from './Game';
import RoundList from './RoundList';

export interface ITeam {
  id: string;
  name: string;
}

export interface IQuestRound {
  id: string;
  questId: string;
  roundNumber: number;
  votes: IVote[];
}

export interface IVote {
  id: string;
  roundId: string;
  playerId: string;
  accept: boolean;
}

export interface IQuest {
  id: string;
  gameId: string;
  winner: ITeam;
  rounds: IQuestRound[];
}

const QuestList: React.SFC<InputProps> = ({ match }) => {
  return (
    <GameQuery query={GET_GAME} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        if (!data) {
          return;
        }
        console.log(data.game);
        return <div>
          <h1>Quests</h1>
          <ul>
            {
              data.game.quests.map(({ id, rounds }) =>
                <li key={id}>
                  {id}
                  <RoundList rounds={rounds} />
                </li>
              )
            }
          </ul>
        </div>
      }}
    </GameQuery>

  );
};

export default QuestList;

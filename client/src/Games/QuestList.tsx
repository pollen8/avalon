import * as React from 'react';
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

interface IProps {
  quests: IQuest[];
}

const QuestList: React.SFC<IProps> = ({ quests }) => {
  console.log('quests', quests);
  return (
    <ul>
      {quests.map(({ id, rounds }) =>
        <li key={id}>
          {id}
          <RoundList rounds={rounds} />
        </li>
      )}
    </ul>
  );
};

export default QuestList;

import * as React from 'react';
import { IQuestRound } from './QuestList';

interface IProps {
  rounds: IQuestRound[];
}

const RoundList: React.SFC<IProps> = ({ rounds }) => {
  return (
    <ul>
      {rounds.map(({ roundNumber, votes }) =>
        <li key={roundNumber}>
          {roundNumber}
          {votes.map((vote) =>
            <div key={vote.id}>
              player: {vote.playerId}
              <br />
              {vote.accept ? 'accepted' : 'rejected'}
            </div>)}
        </li>
      )}
    </ul>
  );
};

export default RoundList;

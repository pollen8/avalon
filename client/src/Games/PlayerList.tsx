import * as React from 'react';

export interface ICharacter {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IPlayer {
  id: string;
  character: ICharacter;
  user: IUser;
}

interface IProps {
  players: IPlayer[];
}

const PlayerList: React.SFC<IProps> = ({ players }) => {

  return (
    <ul>
      {players.map(({ id, user, character }) =>
        <li key={id}>
          {user.name}: {character.name}
        </li>
      )}
    </ul>
  );
};

export default PlayerList;

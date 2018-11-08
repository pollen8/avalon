import * as React from 'react';
import styled from 'styled-components';

import {
  CircleIcon,
  CrossIcon,
  IconStack,
  TickIcon,
} from '@infosum/unikitty';

const Li = styled.li`
display: flex;
> div > div {
  display: block
}
`;

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
      {
        players.map(({ id, user, character }) =>
          <Li key={id} >
            <div style={{ width: '25px' }}>
              {character.name ? <IconStack>
                <CircleIcon width="15" height="15" />
                <TickIcon fill="#fff" width="10" height="10" />
              </IconStack> :
                <IconStack>
                  <CircleIcon width="15" height="15" fill="red" />
                  <CrossIcon fill="#fff" width="10" height="10" />
                </IconStack>}
            </div>
            <div>
              {user.name}
            </div>
          </Li>
        )}
    </ul>
  );
};

export default PlayerList;

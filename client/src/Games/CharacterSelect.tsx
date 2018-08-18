import { FormGroup, Label, VirtualizedSelect } from '@infosum/unikitty';
import * as React from 'react';
import { Query } from "react-apollo";
import { GET_CHARACTER } from '../Characters/Characters';
import { IPlayer } from './PlayerList';

interface IProps {
  players: IPlayer[];
  onChange: (v) => void;
  value: any;
}
const CharacterSelect: React.SFC<IProps> = ({ onChange, value, players }) => {
  console.log('players', players);
  return (
    <Query query={GET_CHARACTER}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        const options = data.characters.map((c) => ({ value: c.id, label: c.name }))
        return (
          <FormGroup>
            <Label>Character</Label>
            <VirtualizedSelect
              value={value}
              options={options}
              onChange={onChange} />
          </FormGroup>
        );
      }}
    </Query>
  );
}

export default CharacterSelect;

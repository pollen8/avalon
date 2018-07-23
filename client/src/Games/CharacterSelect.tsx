import { FormGroup, Label, VirtualizedSelect } from '@infosum/unikitty';
import * as React from 'react';
import { Query } from "react-apollo";
import { GET_CHARACTER } from '../Characters/Characters';

interface IProps {
  onChange: (v) => void;
  value: any;
}
const CharacterSelect: React.SFC<IProps> = ({ onChange, value }) => {
  return (
    <Query query={GET_CHARACTER}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        console.log('chaater slecct', data);
        const options = data.characters.map((c) => ({ value: c.id, label: c.name }))
        console.log('value', value);
        return <FormGroup>
          <Label>Character</Label>
          <VirtualizedSelect
            value={value}
            options={options}
            onChange={onChange} />
        </FormGroup>
      }}
    </Query>
  );
}

export default CharacterSelect;

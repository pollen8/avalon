import { FormGroup, Label, VirtualizedSelect } from '@infosum/unikitty';
import * as React from 'react';
import { Query } from "react-apollo";
import { GET_USERS } from '../Users/Users';

interface IProps {
  onChange: (v) => void;
  value: string[];
}
const PlayerSelect: React.SFC<IProps> = ({ onChange, value }) => {
  return (
    <Query query={GET_USERS}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        const options = data.users.map((u) => ({ value: u.id, label: u.name }))
        console.log(data);
        return <FormGroup>
          <Label>Players</Label>
          <VirtualizedSelect
            value={value}
            multi={true}
            options={options}
            onChange={onChange} />
        </FormGroup>
      }}
    </Query>
  );
}

export default PlayerSelect;

import * as React from 'react';
import { Query } from 'react-apollo';

import {
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from '@infosum/unikitty';

import { GET_USERS } from '../Users/Users';

interface IProps {
  onChange: (v) => void;
  value: string[];
  errors?: string[] | undefined;
}

const PlayerSelect: React.SFC<IProps> = ({ onChange, value, errors }) => {
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
        return (
          <FormGroup>
            <Label>Players</Label>
            <Input
              type="selecct"
              value={value}
              multi={true}
              options={options}
              onChange={onChange} />
            {
              errors
                ? <FormFeedback valid={false}>
                  {errors[0]}
                </FormFeedback>
                :
                <FormFeedback>Between 5 and 10 players</FormFeedback>
            }
          </FormGroup>
        )
      }}
    </Query>
  );
}

export default PlayerSelect;

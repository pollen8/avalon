import * as React from 'react';
import Form, { IInjectedProps } from '../Form';
import Button from '../ui/Button';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

interface IProps {
  submit: (data: {
    [key: string]: string
  }) => void;
  mutate: any;
}
const AddPlayer: React.SFC<IInjectedProps & IProps> = (props) => {
  const { data, setValue } = props;
  console.log('props', props);
  return (
    <div>
      <label>Player:</label>
      <input onChange={(e) => setValue('player', e.target.value)} />
      <Button
        onClick={() => {
          console.log('add', data);

          props.mutate({
            variables: {
              gamId: 1,
              userId: 2,
            }
          }).then(() => setValue('player', ''));
        }}
      >
        Add
      </Button>
    </div>
  );
};

const mutation = gql`
mutation AddPlayerToGame($gameId: String, $userId: String) {
  addPlayerToGame(gameId: $gameId, userId: $userId) {
    id
    lyrics {
      id
      content
      likes
    }
  }
}
`;

export default graphql(mutation)(Form()(AddPlayer));

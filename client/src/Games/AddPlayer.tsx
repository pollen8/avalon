import { Button, Form, FormGroup, Input, Label } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, MutateProps } from 'react-apollo';
import { IPlayer } from './PlayerList';

const initialData: IPlayer = {
  character: {
    id: '',
    name: '',
  },
  id: '',
  user: {
    id: '',
    name: '',
  },
};

const AddPlayer: React.SFC<MutateProps<any>> = (props) => {
  return (
    <Form<IPlayer> initialData={initialData}>
      {({ setValue, formData }) => {
        return <div>
          <FormGroup>
            <Label>Player:</Label>
            <Input
              value={formData.user.name}
              onChange={(e) => setValue('player', e.target.value)} />
          </FormGroup>
          <Button
            onClick={() => {
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
      }}
    </Form>
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

export default graphql(mutation)(AddPlayer);

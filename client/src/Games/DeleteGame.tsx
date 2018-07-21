import { Button } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';

const DELETE_GAME = gql`
mutation deleteGame($id: String!) {
  deleteGame(id: $id) {
    id
  }
}`;


const DeleteGame: React.SFC<{ id: string }> = ({ id }) => (
  <Mutation mutation={DELETE_GAME}>
    {(deleteGame) => <Button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        deleteGame({ variables: { id } });
      }}>-</Button>}
  </Mutation>
);

export default DeleteGame;


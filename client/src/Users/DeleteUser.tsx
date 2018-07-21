import { Button } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { GET_USERS } from './Users';

const DELETE_USER = gql`
mutation deleteUser($id: String!) {
  deleteUser(id: $id) {
    id
  }
}`;


const DeleteUser: React.SFC<{ id: string }> = ({ id }) => (
  <Mutation mutation={DELETE_USER}
    update={(cache, { data }) => {
      const { users } = cache.readQuery<any>({ query: GET_USERS });
      cache.writeQuery({
        data: { users: users.filter((user) => user.id !== id) },
        query: GET_USERS,
      });
    }}>
    {(deleteUser) => <Button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        deleteUser({ variables: { id } });
      }}>-</Button>}
  </Mutation>
);

export default DeleteUser;


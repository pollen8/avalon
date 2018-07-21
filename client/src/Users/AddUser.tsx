import { Button, Form, FormGroup, Input, Label } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { GET_USERS } from './Users';


interface IAddUserRequest {
  id?: string;
  name: string;
}

const ADD_USER = gql`
mutation AddGame($name: String!) {
  addUser(name: $name) {
    id,
    name
  }
}
`;

const AddUser: React.SFC<{}> = () => {
  return (
    <Mutation
      mutation={ADD_USER}
      update={(cache, { data: { addUser } }) => {
        const { users } = cache.readQuery<any>({ query: GET_USERS });
        cache.writeQuery({
          data: { users: users.concat([addUser]) },
          query: GET_USERS,
        });
      }}>
      {(addUser) => (
        <Form<IAddUserRequest>>
          {({ setValue, formData }) => {
            return <div>
              <FormGroup>
                <Label>
                  Name:
              </Label>
                <Input onChange={(e) => setValue('name', e.target.value)} />
              </FormGroup>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addUser({ variables: { name: formData.name } });
                }}
              >
                Add
          </Button>
            </div>
          }}
        </Form>
      )}
    </Mutation>
  );
};


export default AddUser;

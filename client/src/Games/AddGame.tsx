// import Form, { IInjectedProps } from '../Form';
import { Button, Form, FormGroup, Input, Label } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { GET_GAMES } from './Games';


interface IAddGameRequest {
  id?: string;
  name: string;
  numberOfPlayers: number;
}

const ADD_GAME = gql`
mutation AddGame($name: String!, $numberOfPlayers: Int ) {
  addGame(name: $name, numberOfPlayers: $numberOfPlayers) {
    id,
    name,
    numberOfPlayers
  }
}
`;

const AddGame: React.SFC<{}> = () => {
  return (
    <Mutation
      mutation={ADD_GAME}
      update={(cache, { data: { addGame } }) => {
        const { games } = cache.readQuery<any>({ query: GET_GAMES });
        cache.writeQuery({
          data: { games: games.concat([addGame]) },
          query: GET_GAMES,
        });
      }}>
      {(addGame) => (
        <Form<IAddGameRequest>>
          {({ setValue, formData }) => {
            return <div>
              <FormGroup>
                <Label>
                  Name:
              </Label>
                <Input onChange={(e) => setValue('name', e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>
                  Number of players
                </Label>
                <Input type="number"
                  onChange={(e) => setValue('numberOfPlayers', Number(e.target.value))} />
              </FormGroup>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addGame({ variables: { ...formData } });

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

export default AddGame;

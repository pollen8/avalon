// import Form, { IInjectedProps } from '../Form';
import { Button, Form, FormGroup, Input, Label } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { GET_GAMES } from './Games';
import PlayerSelect from './PlayerSelect';

interface IAddGameRequest {
  id?: string;
  name: string;
  numberOfPlayers: number;
  players: Array<{ value: string, label: string }>,
}

const ADD_GAME = gql`
mutation AddGame($name: String!, $numberOfPlayers: Int, $players: [String] ) {
  addGame(name: $name, numberOfPlayers: $numberOfPlayers, players: $players) {
    id,
    name,
    numberOfPlayers,
    players {
      id
    }
  }
}
`;

const initialData: IAddGameRequest = {
  name: '',
  numberOfPlayers: 10,
  players: [],
};

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
        <Form<IAddGameRequest> initialData={initialData}>
          {({ setValue, formData }) => {
            return <div>
              <FormGroup>
                <Label>
                  Name:
              </Label>
                <Input onChange={(e) => setValue('name', e.target.value)} />
              </FormGroup>
              <PlayerSelect
                value={formData.players.map((p) => p.value)}
                onChange={(e) => setValue('players', e)} />
              <FormGroup>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    addGame({
                      variables: {
                        ...formData,
                        numberOfPlayers: formData.players.length,
                        players: formData.players.map((p) => p.value),
                      }
                    });

                  }}
                >
                  Add
          </Button>
              </FormGroup>
            </div>
          }}
        </Form>
      )}
    </Mutation>
  );
};

export default AddGame;

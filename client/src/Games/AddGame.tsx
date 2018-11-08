import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { required } from 'validate-promise';

import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from '@infosum/unikitty';

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

const contract = [
  {
    key: 'name',
    msg: () => 'Name is required',
    promises: [{
      rule: required,
    }]
  },
  {
    key: 'players',
    msg: () => 'Must have between 5 and 10 players',
    promises: [{
      rule: (value: any, row, msg): Promise<string | void> => {
        if (value.length < 5 || value.length > 9) {
          return Promise.reject(msg());
        }
        return Promise.resolve();
      },
    }]
  }
];

const AddGame: React.SFC<RouteComponentProps<any>> = ({ history }) => {
  return (
    <Mutation
      mutation={ADD_GAME}
      update={(cache, { data: { addGame } }) => {
        const { games } = cache.readQuery<any>({ query: GET_GAMES });
        cache.writeQuery({
          data: { games: games.concat([addGame]) },
          query: GET_GAMES,
        });
      }}
      onCompleted={(data) => {
        history.push(`/games/${data.addGame.id}`);
      }}>
      {(addGame) => (
        <Form<IAddGameRequest>
          initialData={initialData}
          contract={contract}
        >
          {({ setValue, formData, validate, errors }) => {
            return <div>
              <h1>New Game</h1>
              <FormGroup>
                <Label>
                  Name:
              </Label>
                <Input onChange={(e) => setValue('name', e.target.value)} />
                {
                  errors.name && <FormFeedback valid={false}>
                    {errors.name[0]}
                  </FormFeedback>
                }
              </FormGroup>
              <PlayerSelect
                value={formData.players.map((p) => p.value)}
                errors={errors.players}
                onChange={(e) => setValue('players', e)} />
              <FormGroup>
                <Button
                  type="button"
                  onClick={async (e) => {
                    try {
                      e.preventDefault();
                      await validate(formData);
                      const game = {
                        variables: {
                          ...formData,
                          numberOfPlayers: formData.players.length,
                          players: formData.players.map((p) => p.value),
                        }
                      };
                      addGame(game);
                    } catch (e) {
                      console.error(e);
                    }
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

export default withRouter(AddGame);

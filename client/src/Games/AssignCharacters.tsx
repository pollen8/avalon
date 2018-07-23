import { Button, Form, FormGroup, Label, VirtualizedSelect } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import CharacterSelect from './CharacterSelect';
import { IGame } from './Game';

interface IUpdatePlayerRequest {
  id: string;
  user: string;
  character: { value: string, label: string };
}

const EDIT_GAME = gql`
mutation UpdatePlayerInGame($id: String, $user: String, $character: String ) {
  updatePlayerInGame(id: $id, user: $user, character: $character) {
    id,
  }
}
`;

const initialData: IUpdatePlayerRequest = {
  character: { value: '', label: '' },
  id: '',
  user: '',
};

const teamMap = {
  5: { good: 3, evil: 2 },
  6: { good: 4, evil: 2 },
  7: { good: 4, evil: 3 },
  8: { good: 5, evil: 3 },
  9: { good: 6, evil: 3 },
  10: { good: 6, evil: 4 },
}

const AssignCharacters: React.SFC<{ game: IGame }> = ({ game }) => {
  console.log('teamMap', teamMap, game);
  return (
    <div>
      <h2>Assign characters</h2>
      <Mutation
        mutation={EDIT_GAME}
        update={(cache, { data: { addGame } }) => {
          const { games } = cache.readQuery<any>({ query: EDIT_GAME });
          cache.writeQuery({
            data: { games: games.concat([addGame]) },
            query: EDIT_GAME,
          });
        }}>
        {(updatePlayerInGame) => (
          <Form<IUpdatePlayerRequest> initialData={initialData}>
            {({ setValue, formData }) => {
              const unassignedPlayers = game.players.map((p) => ({
                label: p.user.name,
                value: p.user.id,
              }))
              console.log('formdata', formData.character);
              return <div>
                gameid  <input value={game.id} />
                <FormGroup>
                  <Label>
                    Player:
                  </Label>
                  <VirtualizedSelect
                    value={formData.user}
                    options={unassignedPlayers}
                    onChange={(e) => setValue('user', e.value)} />
                </FormGroup>
                <CharacterSelect
                  value={formData.character.value}
                  onChange={(e) => setValue('character', e)} />

                <FormGroup>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const { character, ...rest } = formData;
                      const player = game.players.find((p) => p.user.id === formData.user);
                      const variables = {
                        ...rest,
                        character: character.value,
                        id: player ? player.id : ''
                      };
                      console.log('variables', variables);
                      updatePlayerInGame({
                        variables
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
    </div>
  )
}

export default AssignCharacters;

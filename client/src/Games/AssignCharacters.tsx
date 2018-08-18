import { Button, Form, FormGroup, Label, VirtualizedSelect } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import CharacterSelect from './CharacterSelect';
import { IGame } from './Game';

interface IUpdatePlayerRequest {
  characterId: string;
  gameId: string;
  id: string;
  userId: string;
}

const EDIT_GAME = gql`
mutation UpdatePlayerInGame($id: String, $userId: String, $characterId: String, $gameId: String ) {
  updatePlayerInGame(id: $id, userId: $userId, characterId: $characterId, gameId: $gameId) {
    id,
    gameId,
    character {
      id
      name
    }
    user {
      id
      name
    }
  }
}
`;

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


  const initialData: IUpdatePlayerRequest = {
    characterId: '',
    gameId: game.id,
    id: '',
    userId: '',
  };
  return (
    <div>
      <h2>Assign characters</h2>
      <Mutation
        mutation={EDIT_GAME}
      >
        {(updatePlayerInGame) => (
          <Form<IUpdatePlayerRequest> initialData={initialData}>
            {({ setValue, formData }) => {
              const unassignedPlayers = game.players.map((p) => ({
                label: p.user.name,
                value: p.user.id,
              }))
              return <div>
                <FormGroup>
                  <Label>
                    Player:
                  </Label>
                  <VirtualizedSelect
                    value={formData.userId}
                    options={unassignedPlayers}
                    onChange={(e) => setValue('userId', e.value)} />
                </FormGroup>
                <CharacterSelect
                  players={game.players}
                  value={formData.characterId}
                  onChange={(e) => setValue('characterId', e.value)} />

                <FormGroup>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const player = game.players.find((p) => p.user.id === formData.userId);
                      const variables = {
                        ...formData,
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

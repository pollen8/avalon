import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

import {
  Button,
  Form,
} from '@infosum/unikitty';

import { GET_GAME_QUESTS } from './Games';

interface IAddQuestRequest {
  gameId: string;
}

const ADD_QUEST = gql`
mutation AddQuest($gameId: String! ) {
  addQuest(name: $gameId) {
    gameId
  }
}
`;

const initialData: IAddQuestRequest = {
  gameId: '',
};

const AddQuest: React.SFC<RouteComponentProps<any>> = ({ history }) => {
  return (
    <Mutation
      mutation={ADD_QUEST}
      update={(cache, { data: { addQuest } }) => {
        console.log('update', addQuest);
        debugger;
        const { quests } = cache.readQuery<any>({ query: GET_GAME_QUESTS });
        cache.writeQuery({
          data: { quests: quests.concat([addQuest]) },
          query: GET_GAME_QUESTS,
        });
      }}
      onCompleted={(data) => {
        console.log('onCOmplete data', data);
        // history.push(`/games/${data.addGame.id}`);
      }}>
      {
        (addQuest) => (
          <Form<IAddQuestRequest> initialData={initialData}>
            {({ setValue, formData }) => {
              return <div>

                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    const quest = {

                    };
                    addQuest(quest);

                  }}
                >
                  Start Quest
          </Button>
              </div>
            }}
          </Form>
        )}
    </Mutation>
  );
};

export default withRouter(AddQuest);

// import Form, { IInjectedProps } from '../Form';
import { Button, Form, FormGroup, Input, Label } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
// import { gamesQuery } from './Games';


interface IAddGameRequest {
  name: string;
}

const ADD_GAME = gql`
mutation AddGame($name: String!) {
  addGame(name: $name) {
    name
  }
}
`;

const AddGame: React.SFC<{}> = (props) => {
  // const { data, setValue } = props;
  console.log('addgame', props);
  return (
    <Mutation mutation={ADD_GAME}>
      {(addGame, { data }) => (
        <Form<IAddGameRequest>>
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
                  addGame({ variables: { name: formData.name } });
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
// export default graphql(AddGame);

// export default compose(
//   graphql(mutation),
//   withState('form', 'setFormData', { name: '' }),
//   withHandlers(
//     {
//       addGame: ({ mutate, form }: { mutate: Function, form: object }) => {
//         return (): Promise<{}> => {
//           return mutate({
//             variables: form,
//             refetchQueries: [{ query: gamesQuery }],
//           }).then((data: string) => {
//             console.log(data, 'Return value');
//           }).catch((e: Error) => {
//             console.error(e, 'Error');
//           });
//         };
//       }
//     }
//   )
// )(AddGame);
// {"operationName":null,"variables":{},"query":"{\n  games {\n    id\n    name\n    __typename\n  }\n}\n"}
// {"operationName":null,"variables":{},"query":"{\n  games {\n    id\n    name\n    __typename\n  }\n}\n"}
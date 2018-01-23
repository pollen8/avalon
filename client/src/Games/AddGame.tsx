import { compose, withHandlers, withState } from 'recompose';
import * as React from 'react';
// import Form, { IInjectedProps } from '../Form';
import Button from '../ui/Button';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { gamesQuery } from './Games';

interface IProps {
  addGame: any;
  form: {
    name: string;
  };
  setFormData: Function;
}

const AddGame: React.SFC<IProps> = (props) => {
  // const { data, setValue } = props;
  const { addGame, form, setFormData } = props;
  return (
    <div>
      <label>Name:</label>
      <input onChange={(e) => setFormData({ ...form, 'name': e.target.value })} />
      <Button
        onClick={addGame}
      >
        Add
      </Button>
    </div>
  );
};

const mutation = gql`
mutation AddGame($name: String!) {
  addGame(name: $name) {
    name
  }
}
`;

// export default graphql(mutation)(Form()(AddGame));
export default compose(
  graphql(mutation),
  withState('form', 'setFormData', { name: '' }),
  withHandlers(
    {
      addGame: ({ mutate, form }: { mutate: Function, form: object }) => {
        return (): Promise<{}> => {
          return mutate({
            variables: form,
            refetchQueries: [{ query: gamesQuery }],
          }).then((data: string) => {
            console.log(data, 'Return value');
          }).catch((e: Error) => {
            console.error(e, 'Error');
          });
        };
      }
    }
  )
)(AddGame);
// {"operationName":null,"variables":{},"query":"{\n  games {\n    id\n    name\n    __typename\n  }\n}\n"}
// {"operationName":null,"variables":{},"query":"{\n  games {\n    id\n    name\n    __typename\n  }\n}\n"}
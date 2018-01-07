import * as React from 'react';
import { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, ChildProps } from 'react-apollo';
import Card from '../ui/Card';

interface ICharacter {
  id: string;
  name: string;
  isGood: boolean;
  description: string;
}

interface IResult {
  characters: ICharacter[];
}

interface IInputProps {
}

class Characters extends Component<ChildProps<IInputProps, IResult>, {}> {
  public render() {
    console.log('props', this.props);

    if (!this.props.data) {
      return null;
    }

    if (this.props.data.loading) {
      return <Card><b>Loading....</b></Card>;
    }
    if (this.props.data.characters === undefined) {
      return null;
    }
    return (
      <Card>
        {this.props.data.characters.map((character: ICharacter) =>
          <Card color="white" key={character.id}>
            <h4>{character.name}</h4>
            <p>
              {character.isGood ? 'Good' : 'Evil'}
            </p>
            <p>
              {character.description}
            </p>
          </Card>
        )}
      </Card>);
  }
}

const query = gql`
{
  characters {
    id
    isGood
    description
    name
  }
}`;

const withCharacters = graphql<IResult, IInputProps>(query);

export default withCharacters(Characters);

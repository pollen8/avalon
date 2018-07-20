import { Card } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Component } from 'react';
import { ChildProps, graphql } from 'react-apollo';

export interface ICharacter {
  id: string;
  name: string;
  isGood: boolean;
  description: string;
}

interface IResponse {
  characters: ICharacter[];
}


class Characters extends Component<ChildProps<{}, IResponse>, {}> {
  public render() {

    if (!this.props.data) {
      return null;
    }
    const { loading, characters } = this.props.data;
    if (loading) {
      return <Card><b>Loading....</b></Card>;
    }
    if (characters === undefined) {
      return null;
    }
    return (
      <Card>
        {
          characters.map((character: ICharacter) =>
            <Card color="white" key={character.id}>
              <h4>{character.name}</h4>
              <p>
                {character.isGood ? 'Good' : 'Evil'}
              </p>
              <p>
                {character.description}
              </p>
            </Card>
          )
        }
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

const withCharacters = graphql<{}, IResponse, {}>(query);

export default withCharacters(Characters);

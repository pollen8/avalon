import * as React from 'react';
import { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, ChildProps } from 'react-apollo';
import Card from '../ui/Card';
import { NavLink } from 'react-router-dom';
import { IGame } from './Game';
import AddGame from './AddGame';

interface IResult {
  games: IGame[];
}

interface IInputProps {
}

class Games extends Component<ChildProps<IInputProps, IResult>, {}> {
  public render() {
    console.log('props', this.props);

    if (!this.props.data) {
      return null;
    }

    if (this.props.data.loading) {
      return <Card><b>Loading....</b></Card>;
    }
    if (this.props.data.games === undefined) {
      return null;
    }
    return (
      <Card>
        <AddGame />
        {this.props.data.games.map(({ id, name }) =>
          <div key={id}>
            <NavLink to={`games/${id}`}>
              {name}
            </NavLink>
          </div>
        )}
      </Card>);
  }
}

export const gamesQuery = gql`
{
  games {
    id
    name
  }
}`;

const withGames = graphql<IResult, IInputProps>(gamesQuery);

export default withGames(Games);

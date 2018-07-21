import { Card, CardBody, CardTitle, ListsGroup, ListsItem, ListsItemLabel } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Component } from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import AddGame from './AddGame';
import DeleteGame from './DeleteGame';
import { IGame } from './Game';

interface IResult {
  games: IGame[];
}

class Games extends Component<ChildProps<{}, IResult>, {}> {
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
        <CardBody>
          <CardTitle>
            Games
            </CardTitle>
          <AddGame />
          <ListsGroup>
            {this.props.data.games.map(({ id, name }) =>
              <ListsItem key={id}>
                <NavLink to={`games/${id}`}>
                  <ListsItemLabel>
                    {name}
                  </ListsItemLabel>
                  <DeleteGame id={id} />
                </NavLink>
              </ListsItem>
            )}
          </ListsGroup>
        </CardBody>
      </Card>);
  }
}

export const GET_GAMES = gql`
{
  games {
    id
    name,
    numberOfPlayers
  }
}`;

const withGames = graphql<{}, IResult, {}>(GET_GAMES);

export default withGames(Games);

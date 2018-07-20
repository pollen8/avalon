import { Alert, Card, CardBody, CardTitle, ListsGroup, ListsItem, ListsItemLabel } from '@infosum/unikitty';
import gql from 'graphql-tag';
import * as React from 'react';
import { Component } from 'react';
import { ChildProps, graphql } from 'react-apollo';

interface IUser {
  id: string;
  name: string;
}

interface IResult {
  users: IUser[];
}


class Users extends Component<ChildProps<{}, IResult>, {}> {
  public render() {
    console.log('users props', this.props);
    if (!this.props.data) {
      return null;
    }
    const { loading, error, users } = this.props.data;
    if (loading) {
      return <Card><b>Loading....</b></Card>;
    }
    if (error) {
      return <Alert color="danger100">{error.message}</Alert>
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>
            Users
          </CardTitle>
          <ListsGroup>
            {
              users !== undefined &&
              users.map((user: IUser) =>
                <ListsItem key={user.id}>
                  <ListsItemLabel>
                    {user.name}
                  </ListsItemLabel>
                </ListsItem>
              )}
          </ListsGroup>
        </CardBody>
      </Card>);
  }
}

const query = gql`
{
  users {
    id
    name
  }
}`;

const withUsers = graphql<{}, IResult, {}>(query);

export default withUsers(Users);

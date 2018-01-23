import * as React from 'react';
import { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, ChildProps } from 'react-apollo';
import Card from '../ui/Card';

interface IUser {
  id: string;
  name: string;
}

interface IResult {
  users: IUser[];
}

interface IInputProps {
}

class Users extends Component<ChildProps<IInputProps, IResult>, {}> {
  public render() {
    console.log('props', this.props);

    if (!this.props.data) {
      return null;
    }

    if (this.props.data.loading) {
      return <Card><b>Loading....</b></Card>;
    }
    if (this.props.data.users === undefined) {
      return null;
    }
    return (
      <Card>
        {this.props.data.users.map((user: IUser) =>
          <div key={user.id}>
            <h4>{user.name}</h4>
          </div>
        )}
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

const withUsers = graphql<IResult, IInputProps>(query);

export default withUsers(Users);

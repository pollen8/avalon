import * as React from 'react';
import './App.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Games from './Games/Games';
import Characters from './Characters/Characters';
import Users from './Users/Users';
import { Route, BrowserRouter } from 'react-router-dom';
import Menu from './Menu';
import Header from './Header';
import Container from './ui/Container';
import styled, { ThemeProvider } from 'styled-components';
import theme from './ui/theme';
import Game from './Games/Game';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

interface IState {
  isMenuOpen: boolean;
}

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.darkBlue};
  color: ${(props) => props.theme.grey};
`;

class App extends React.Component<{}, IState> {

  public constructor(props: {}) {
    super(props);
    this.state = {
      isMenuOpen: true,
    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <StyledApp className="App">

              <Header
                toggleMenu={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}
              />
              <Container>
                <Menu
                  isOpen={this.state.isMenuOpen}
                  toggle={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}
                />
                <Route exact={true} path="/" component={Games} />
                <Route path="/games/:id" component={Game} />
                <Route path="/characters" component={Characters} />
                <Route path="/users" component={Users} />
              </Container>
            </StyledApp>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

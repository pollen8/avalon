import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import Characters from './Characters/Characters';
import Game from './Games/Game';
import Games from './Games/Games';
import Header from './Header';
import Menu from './Menu';
import Container from './ui/Container';
import theme from './ui/theme';
import Users from './Users/Users';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
});

interface IState {
  isMenuOpen: boolean;
}

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.darkBlue};
  color: ${(props) => props.theme.grey};
`;

StyledApp.defaultProps = {
  theme,
};

const FlexGrow = styled.div`
  flex-grow: 2;
  margin: 0 0.5rem;
`;

class App extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }
  public render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme.dark200}>
            <StyledApp className="App">

              <Header
                toggleMenu={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}
              />
              <Container>
                <Menu
                  isOpen={this.state.isMenuOpen}
                  toggle={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}
                />
                <FlexGrow>
                  <Route exact={true} path="/" component={Games} />
                  <Route path="/games/:id" component={Game} />
                  <Route path="/characters" component={Characters} />
                  <Route path="/players" component={Users} />
                </FlexGrow>
              </Container>
            </StyledApp>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

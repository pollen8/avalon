import * as React from 'react';
import { Component } from 'react';
import Button from './ui/Button';
import Toolbar from './ui/Toolbar';
import styled from 'styled-components';

interface IProps {
  toggleMenu: () => void;
}

const ToolbarTitle = styled.h1`
  padding-left: 1.4rem;
  font-size: 2rem;
`;

class Header extends Component<IProps, {}> {

  render() {
    const { toggleMenu } = this.props;
    return (
      <Toolbar>
        <Button
          color="orange"
          onClick={() => toggleMenu()}
          aria-label="Menu"
        >Menu
        </Button>
        <ToolbarTitle>
          Avalon tracker...
        </ToolbarTitle>
      </Toolbar>
    );
  }
}

export default Header;
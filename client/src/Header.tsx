import { Button, Navbar } from '@infosum/unikitty';
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

interface IProps {
  toggleMenu: () => void;
}

const ToolbarTitle = styled.h1`
  padding-left: 1.4rem;
  font-size: 2rem;
`;

class Header extends Component<IProps, {}> {

  public render() {
    const { toggleMenu } = this.props;
    return (
      <Navbar>
        <Button
          color="orange"
          onClick={() => toggleMenu()}
          aria-label="Menu"
        >Menu
        </Button>
        <ToolbarTitle>
          Avalon tracker...
        </ToolbarTitle>
      </Navbar>
    );
  }
}

export default Header;
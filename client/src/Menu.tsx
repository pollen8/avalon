import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from './ui/Drawer';
import MenuItem from './ui/MenuItem';
import MenuList from './ui/MenuList';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

class Menu extends Component<IProps, {}> {

  public render() {
    return (

      <Drawer
        isOpen={this.props.isOpen}
        onClose={() => this.props.toggle()}
      >

        <MenuList>
          <MenuItem><NavLink to="/">Games</NavLink></MenuItem>
          <MenuItem><NavLink to="/characters">Characters</NavLink></MenuItem>
          <MenuItem><NavLink to="/users">Users</NavLink></MenuItem>
        </MenuList>
      </Drawer>

    );
  }
}

export default Menu;
import * as React from 'react';
import { Component } from 'react';
import Button from './Button';
import styled, { StyledFunction } from 'styled-components';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element[] | JSX.Element | string | undefined;
  className?: string;
}

interface IFoo {
  isOpen: boolean;
}

const StyledDrawer: StyledFunction<IFoo & React.HTMLProps<HTMLDivElement>> = styled.div;

const StyledDraw = StyledDrawer`
  width: ${(props) => props.isOpen ? '22rem' : 0};
  min-height: 100%; 
  overflow: hidden;
  background-color: #ddd;
  transition: width 0.2s;
`;

class Drawer extends Component<IProps, {}> {

  public render() {
    const { onClose, children, ...rest } = this.props;
    return (
      <StyledDraw
        {...rest}
      >
        <Button onClick={(e) => onClose()}>
          close
        </Button>
        {children}
      </StyledDraw>
    );
  }
}

export default Drawer;

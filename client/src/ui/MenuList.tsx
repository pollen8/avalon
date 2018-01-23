import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
}

const StyledMenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const MenuList: React.SFC<IProps> = ({ children, className }) => {
  return (
    <StyledMenuList className={className}>
      {children}
    </StyledMenuList>
  );
};

export default MenuList;

import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
}

const StyledMenuItem = styled.li`
  padding: 0.6rem 1.4rem;

  a {
    text-decoration: none;
  }
`;

const MenuItem: React.SFC<IProps> = ({ children, className }) => {
  return (
    <StyledMenuItem className={className}>
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem;

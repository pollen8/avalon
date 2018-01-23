import * as React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  min-height: 100%;
`;

interface IProps {
  children?: JSX.Element[] | JSX.Element | string;
  className?: string;
}

const Container: React.SFC<IProps> = ({ children, className }) => {
  return (
    <StyledContainer
      className={className}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;

import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
}

const StyledToolBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  min-height: 7rem;
  padding: 0 1rem;
`;

const ToolBar: React.SFC<IProps> = ({ children, className }) => {

  return (
    <StyledToolBar className={className}>
      {children}
    </StyledToolBar>
  );
};

export default ToolBar;

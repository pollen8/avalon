import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  color?: string;
  children?: JSX.Element[] | JSX.Element | string;
  className?: string;
}

const StyledCard = styled.div`
    padding: 1.4rem;
    margin: 1.4rem;
    background-color: ${(props) => props.color || 'transparent'};
`;

const Card: React.SFC<IProps> = ({ color, children, className }) => {
  return (
    <StyledCard
      color={color}
      className={className}
    >
      {children}
    </StyledCard>
  );
};

export default Card;

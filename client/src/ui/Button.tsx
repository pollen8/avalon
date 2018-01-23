import * as React from 'react';
import { MouseEvent } from 'react';
import styled from 'styled-components';

interface IProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
  children?: JSX.Element[] | JSX.Element | string;
  className?: string;
  color?: string;
}

const StyledButton = styled.a`
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    line-height: 1.5;
    border-radius: .25rem;
    cursor: pointer;
    background-color: ${(props) => props.color || props.theme.primary};
    color: #fff;
`;
const Button: React.SFC<IProps> = ({ color, onClick, children, className }) => {
  return (
    <StyledButton
      color={color}
      onClick={onClick}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

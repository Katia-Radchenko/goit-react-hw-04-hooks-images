import styled from 'styled-components';

export const LoadMoreButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: auto;
  margin-left: auto;
  margin-bottom: ${props => props.theme.spacing(3)};
  width: 150px;
  height: 40px;
  font-size: 18px;
  background-color: ${props => props.theme.colors.backgroundColor};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: background-color 250ms ease, transform 250ms ease;
  &:hover,
  &focus-visible {
    transform: scale(1.05);
    background-color: ${props => props.theme.colors.hoverBackgroundColor};
  }
  &:active {
    transform: scale(0.95);
  }
`;

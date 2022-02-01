import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  height: 50px;
  background: ${(props) => props.theme.colors.backgroundColor};
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: ${props => props.theme.spacing(1)};
  padding-right: ${props => props.theme.spacing(1)};
  
  @media (min-width: 768px) {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 32px;
  padding: 0;
  padding-left: ${props => props.theme.spacing(9)};
  color: inherit;
  border: none;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    border: 1px solid ${props => props.theme.colors.borderColor};
    outline: none;
  }
`;
import styled from "styled-components";

export const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: translateY(-50%);
  svg {
    width: 16px;
    height: 16px;
    stroke: ${(props) => props.theme.colors.iconColor};
  }
`;
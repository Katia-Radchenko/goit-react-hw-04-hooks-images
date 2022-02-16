import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  ${props =>
    props.center &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `};
`;

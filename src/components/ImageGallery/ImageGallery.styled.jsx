import styled from "styled-components";

export const Gallery = styled.ul`
width: 100%;
margin-top: ${props => props.theme.spacing(3)};
margin-bottom: ${props => props.theme.spacing(3)};
padding-left: ${props => props.theme.spacing(3)};
padding-right: ${props => props.theme.spacing(3)};
list-style: none;
@media(min-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: ${props => props.theme.spacing(3)};
    grid-column-gap: ${props => props.theme.spacing(3)};
  };
  @media(min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  };
  @media(min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  };
`;
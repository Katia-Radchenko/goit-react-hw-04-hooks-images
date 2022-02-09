import styled from "styled-components";

export const Item = styled.li`
    margin-bottom: ${props => props.theme.spacing(3)};
    @media(min-width: 480px) {
      margin-bottom: 0;
    }
    cursor: pointer;
    transition: transform 250ms ease;
    &:hover {
      transform: scale(1.02);
    }
`; 

export const Image = styled.img`
    height: 200px;
    object-fit: cover;
`;
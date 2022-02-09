import React from "react";

import { LoadMoreButton } from "./Button.styled";

const Button = ({onClick}) => {
    return (
        <LoadMoreButton type="submit" onClick={onClick}>Load more</LoadMoreButton>
    )
}

export default Button;
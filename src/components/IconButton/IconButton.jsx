import React from "react";

import { Button } from "./IconButton.styled";

const IconButton = ({ children }) => {
  return <Button type="submit">{children}</Button>;
};

export default IconButton;
import React from 'react';

import { Button } from './IconButton.styled';

export default function IconButton({ children }) {
  return <Button type="submit">{children}</Button>;
}

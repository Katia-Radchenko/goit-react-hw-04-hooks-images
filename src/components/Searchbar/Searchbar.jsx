import { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import { FiSearch } from 'react-icons/fi';
import { Header, Form, Input } from './Searchbar.styled';
import IconButton from '../IconButton/IconButton';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryHandler = e => {
    setSearchQuery(e.target.value);
  };

  const submitFormHandler = e => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query !== '') {
      onSubmit(query);
    } else {
      toast.error('Enter a valid search query!', {
        duration: 2000,
      });
    }

    setSearchQuery('');
  };

  return (
    <Header>
      <Form onSubmit={submitFormHandler}>
        <Input
          onChange={searchQueryHandler}
          value={searchQuery}
          placeholder="Search images and photos"
          type="text"
          autocomplete="off"
        ></Input>
        <IconButton>
          <FiSearch />
        </IconButton>
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

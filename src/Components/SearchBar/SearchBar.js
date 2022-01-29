import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import Toastify from '../Toastify/Toastify';

const SearchWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
`;

const SearchButton = styled.button`
  margin-right: 10px;
  padding: 0;
  color: black;
  border: 0;
  background-color: transparent;

  :hover {
    color: blue;
    opacity: 1;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 24px;
  border: none;
  outline: none;

  ::placeholder {
    color: black;
    opacity: 0.6;
  }
`;

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      Toastify(
        'warning',
        'Please, enter the name of the movie you want to find!',
      );
    } else {
      onSubmit(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ImSearch style={{ width: 24, height: 24 }} />
        </SearchButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchWrapper>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

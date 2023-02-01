import { toast } from 'react-toastify';
import '../styles.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');
  const handleNameChange = ({ currentTarget: { value } }) => {
    setImageName(value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!imageName.trim()) {
      toast.error('Name required');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label"></span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          value={imageName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

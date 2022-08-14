import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';

function Header({ title, profileIcon, searchIcon }) {
  const [toggleInput, setToggleInput] = useState(false);
  const history = useHistory();

  return (
    <>
      <header className="header-container">
        <div className="profile-icon-container">
          <img
            className="cursor-icon"
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
            onClick={ () => history.push('/profile') }
            role="presentation"
          />
        </div>
        <div className="page-title-container">
          <h1
            data-testid="page-title"
          >
            { title }
          </h1>
        </div>
        <div className="search">
          {searchIcon
          && <img
            className="cursor-icon"
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
            onClick={ () => setToggleInput(!toggleInput) }
            role="presentation"
          />}
        </div>
      </header>
      <div className="search-input-container">
        {
          toggleInput ? <SearchBar setToggleInput={ setToggleInput } /> : null
        }
      </div>
      <hr />
    </>
  );
}

Header.defaultProps = {
  searchIcon: PropTypes.false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profileIcon: PropTypes.string.isRequired,
  searchIcon: PropTypes.string,
};

export default Header;

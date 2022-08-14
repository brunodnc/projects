import React, { useState, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import recipesContext from '../context/context';
import './SearchBar.css';

function SearchBar({ setToggleInput }) {
  const { searchMeals, searchDrinks, setComidaContext } = useContext(recipesContext);
  const [inputSearch, setInputSearch] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('name');

  const history = useHistory();
  const { pathname } = history.location;

  const fetchMealsHandler = useCallback(() => {
    if (pathname === '/foods') {
      searchMeals(inputSearch, selectedRadio);
      setComidaContext(true);
      setToggleInput(false);
    }
  }, [inputSearch, searchMeals, selectedRadio,
    pathname, setComidaContext, setToggleInput]);

  const fetchDrinksHandler = useCallback(() => {
    if (pathname === '/drinks') {
      searchDrinks(inputSearch, selectedRadio);
      setComidaContext(false);
      setToggleInput(false);
    }
  }, [inputSearch, searchDrinks, selectedRadio,
    pathname, setComidaContext, setToggleInput]);

  return (
    <form className="form-container">
      <input
        className="input-search"
        type="text"
        data-testid="search-input"
        placeholder="pesquisar"
        value={ inputSearch }
        onChange={ (e) => setInputSearch(e.target.value) }
      />
      <br />
      <br />
      <label htmlFor="ingredient-search">
        Ingredient
        <input
          className="radio-element"
          name="search"
          id="ingredient-search"
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onClick={ (e) => setSelectedRadio(e.target.value) }
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          className="radio-element"
          name="search"
          id="name-search"
          type="radio"
          data-testid="name-search-radio"
          value="name"
          defaultChecked
          onClick={ (e) => setSelectedRadio(e.target.value) }
        />
      </label>
      <label htmlFor="first-letter-search">
        First Letter
        <input
          className="radio-element"
          name="search"
          id="first-letter-search"
          type="radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onClick={ (e) => setSelectedRadio(e.target.value) }
        />
      </label>
      <br />
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ pathname === '/foods' ? fetchMealsHandler : fetchDrinksHandler }
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  setToggleInput: PropTypes.func.isRequired,

};

export default SearchBar;

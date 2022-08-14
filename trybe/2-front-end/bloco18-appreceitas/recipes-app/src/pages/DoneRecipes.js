import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [list, setList] = useState('');
  const [resultList, resultSetList] = useState([]);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    resultSetList(doneRecipes);
    if (doneRecipes !== null) {
      if (list === 'food') {
        resultSetList(doneRecipes.filter((recipes) => recipes.type === 'food'));
      }
      if (list === 'drink') {
        resultSetList(doneRecipes.filter((recipes) => recipes.type === 'drink'));
      }
    }
  }, [list]);

  return (
    <div>
      <Header
        title="Done Recipes"
        profileIcon={ profileIcon }
      />
      <button
        type="button"
        onClick={ () => { setList('all'); } }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => { setList('food'); } }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => { setList('drink'); } }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {resultList && resultList.map((elem, index) => (
        <div key={ index }>
          <Link to={ elem.type === 'food' ? `/foods/${elem.id}` : `/drinks/${elem.id}` }>
            <img
              type="image"
              src={ elem.image }
              alt="food-card"
              width="200"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${elem.nationality} - ${elem.category}` }
              {elem.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{elem.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{elem.doneDate}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => {
              copy(`http://localhost:3000${elem.type === 'food' ? `/foods/${elem.id}` : `/drinks/${elem.id}`}`);
              setCopiado(true);
            } }
          >
            <img src={ shareIcon } alt="Share icon" />
            Compartilhar
          </button>
          {copiado && <p>Link copied!</p>}
          {elem.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))}
        </div>))}
    </div>
  );
}

export default DoneRecipes;

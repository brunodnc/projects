import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [msgCopied, setMsgCopied] = useState(false);

  const getFavoriteRecipes = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    setFavoriteRecipes(JSON.parse(favoriteRecipesStorage));
  };

  const removeFavoriteRecipesLocalStorage = (recipe) => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    const removeFav = favoritesObj.filter((i) => i.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavoriteRecipes(removeFav);
  };

  const filterFavoritesDrinks = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    const favDrik = favoritesObj.filter((i) => i.image.includes('drink'));

    setFavoriteRecipes(favDrik);
    console.log('drinks');
  };

  const filterFavoritesFoods = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    const favFood = favoritesObj.filter((i) => i.image.includes('meals'));
    setFavoriteRecipes(favFood);
  };

  const filterAll = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    setFavoriteRecipes(favoritesObj);
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        profileIcon={ profileIcon }
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterFavoritesFoods }
        >

          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterFavoritesDrinks }
        >
          Drinks
        </button>
      </div>
      {msgCopied && <p>Link copied!</p>}
      <div>
        {favoriteRecipes && favoriteRecipes.map((item, index) => (
          <div key={ item.id } className="card">
            <div>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.alcoholicOrNot === 'Alcoholic'
                  ? item.alcoholicOrNot
                  : `${item.nationality} - ${item.category}`}
              </p>
              <Link
                to={ `/${item.image.includes('meals')
                  ? 'foods' : 'drinks'}/${item.id}` }
              >
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <button
                type="button"
                onClick={ () => {
                  copy(`http://localhost:3000/${item.image.includes('meals')
                    ? 'foods' : 'drinks'}/${item.id}`);
                  setMsgCopied(true);
                } }
              >
                <img
                  className="svg-icon"
                  alt="share-icon"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                {' '}
                Compartilhar

              </button>
              <button
                type="button"
                onClick={ () => {
                  removeFavoriteRecipesLocalStorage(item);
                } }
              >
                <img
                  src={ blackHeartIcon }
                  alt="black icon"
                  className="svg-icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />

              </button>

            </div>
            <div>
              <Link
                to={ `/${item.image.includes('meals')
                  ? 'foods' : 'drinks'}/${item.id}` }
              >
                <img
                  src={ item.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt={ item.name }
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;

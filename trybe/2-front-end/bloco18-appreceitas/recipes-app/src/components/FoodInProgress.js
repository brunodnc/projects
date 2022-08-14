import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/context';

const copy = require('clipboard-copy');

function FoodInProgress() {
  const {
    dataInProgress,
    ingredients,
    setIngredients,
    measures,
  } = useContext(recipesContext);
  const [linkCopy, setLinkCopy] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const tempIngredients = ingredients.map(
      (ingredient) => (ingredient.ingredient === name
        ? { ...ingredient, isChecked: checked, done: checked } : ingredient),
    );
    setIngredients(tempIngredients);
    const doneIngredients = [];
    tempIngredients.map(
      (ingredient) => (
        ingredient.done === true ? doneIngredients.push(ingredient.ingredient) : null
      ),
    );
    if (doneIngredients.length === tempIngredients.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <img
        width={ 200 }
        src={ dataInProgress.strMealThumb }
        alt={ dataInProgress.strMeal }
        data-testid="recipe-photo"
        a
      />
      <h4 data-testid="recipe-title">{dataInProgress.strMeal}</h4>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          const url = `http://localhost:3000/foods/${dataInProgress.idMeal}`;
          copy(url);
          setLinkCopy(true);
        } }
      >
        Compartilhar

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      {linkCopy && <p>Link copied!</p>}
      <p data-testid="recipe-category">{dataInProgress.strCategory}</p>
      <h4>Ingredients</h4>
      {ingredients && ingredients.map((ingredient, index) => (
        <div key={ index }>
          <label
            htmlFor={ ingredient.ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ {
              textDecoration: ingredient.done ? 'line-through' : 'none',
            } }
          >
            <input
              type="checkbox"
              id={ ingredient.ingredient }
              name={ ingredient.ingredient }
              value={ ingredient.ingredient }
              checked={ ingredient?.isChecked || false }
              onChange={ handleChange }
            />
            {ingredient.ingredient}
          </label>
        </div>
      ))}
      {measures && measures.map((item, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {item.measure}
        </span>
      ))}
      <span>Instructions</span>
      <p data-testid="instructions">{dataInProgress.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
        disabled={ isDisabled }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default FoodInProgress;

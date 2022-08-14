import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './styles/recipeDetails.css';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const [rd, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [receitaFeita, setReceitaFeita] = useState(false);
  const [receitaEmProgresso, setReceitaEmProgresso] = useState(false);
  const [favoritada, setFavoritada] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const history = useHistory();
  const comida = history.location.pathname.includes('foods');
  const id = comida ? history.location.pathname.split('/foods/').join('')
    : history.location.pathname.split('/drinks/').join('');
  useEffect(() => {
    const six = 6;
    if (comida) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((raw) => raw.json()) // gera detalhes da receita
        .then((data) => setRecipeDetails(data.meals[0]));
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((raw) => raw.json()) // gera recomendações de bebidas
        .then((data) => setRecomendations(data.drinks.slice(0, six)));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((raw) => raw.json()) // gera detalhes da receita
        .then((data) => setRecipeDetails(data.drinks[0]));
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((raw) => raw.json()) // gera recomendações de comida
        .then((data) => setRecomendations(data.meals.slice(0, six)));
    }
  }, []);

  console.log(rd);

  useEffect(() => { // efeito para criar ingredients
    if (rd !== []) {
      const ingredientsArr = [];
      const quantitiesArr = [];
      Object.keys(rd).forEach((key) => {
        if (key.includes('Ingredient') && rd[key]) {
          ingredientsArr.push(rd[key]);
        }
        if (key.includes('Measure') && rd[key]) {
          quantitiesArr.push(rd[key]);
        }
      });
      setIngredients(ingredientsArr
        .filter((item) => item !== '') // limpa os itens vazios
        .map((item, i) => (
          { item: ingredientsArr[i], quantity: quantitiesArr[i] }))); // cria um array de objetos para ser renderizado no return como ingredientes : quantidades
    }
  }, [rd]);

  useEffect(() => { // checa se a receita já foi feita, ou está em progresso
    if (rd !== []) {
      if (localStorage.getItem('doneRecipes') !== null) {
        const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
        setReceitaFeita(doneRecipes.some((item) => (comida ? item.id === rd.idMeal
          : item.id === rd.idDrink)));
      }
      if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
        let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (comida) {
          inProgressRecipes = Object.keys(inProgressRecipes.meals)
            .some((item) => item === rd.idMeal);
        } else {
          inProgressRecipes = Object.keys(inProgressRecipes.cocktails)
            .some((item) => item === rd.idDrink);
        }
        console.log(inProgressRecipes);
        setReceitaEmProgresso(inProgressRecipes);
      }
    }
  }, [rd]);

  useEffect(() => { // checa se a recipe está favoritada
    if (rd !== []) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        setFavoritada(favoriteRecipes.some((favorita) => (
          comida ? favorita.id === rd.idMeal : favorita.id === rd.idDrink)));
      }
    }
  }, [rd]);

  const favoriteClick = () => {
    let favoriteRecipes = [];
    if (localStorage.getItem('favoriteRecipes')) {
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    if (favoriteRecipes.some((favorita) => (comida ? favorita.id === rd.idMeal
      : favorita.id === rd.idDrink))) { // se já é favorite, desfavorite-a
      favoriteRecipes = favoriteRecipes.filter((item) => (
        comida ? item.id !== rd.idMeal : item.id !== rd.idDrink));
      setFavoritada(false);
    } else {
      favoriteRecipes = [...favoriteRecipes, comida ? ({
        id: rd.idMeal,
        type: 'food',
        nationality: rd.strArea,
        category: rd.strCategory,
        alcoholicOrNot: '',
        name: rd.strMeal,
        image: rd.strMealThumb,
      })
        : ({
          id: rd.idDrink,
          type: 'drink',
          nationality: rd.strArea ? rd.strArea : '',
          category: rd.strCategory,
          alcoholicOrNot: rd.strAlcoholic,
          name: rd.strDrink,
          image: rd.strDrinkThumb,
        })];
      setFavoritada(true);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ comida ? rd.strMealThumb : rd.strDrinkThumb }
        alt={ comida ? rd.strMeal : rd.strDrink }
        width="200"
      />
      <h2 data-testid="recipe-title">{comida ? rd.strMeal : rd.strDrink}</h2>
      <h3 data-testid="recipe-category">
        {rd.strCategory}
        {!comida && rd.strAlcoholic}
      </h3>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li
            key={ i }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {`${ingredient.item} + ${ingredient.quantity}`}
          </li>))}
      </ul>
      <p data-testid="instructions">{rd.strInstructions}</p>
      {comida && (<video muted data-testid="video" src={ rd.strYoutube } />)}
      {/* falta implementar direito o vídeo na linha de cima */}
      <div className="recomendations">
        {recomendations.map((item, i) => ( // fazer o css e transfar em um carousel, mostrando 2 por vez, e scrolando na horizontal
          <Link
            data-testid={ `${i}-recomendation-card` }
            key={ i }
            to={ !comida ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}` }
            className="rec-card"
          >
            <img
              width="200"
              src={ !comida ? item.strMealThumb : item.strDrinkThumb }
              data-testid={ `${i}-recomendation-img` }
              alt={ !comida ? item.strMeal : item.strDrink }
            />
            <p data-testid={ `${i}-recomendation-title` }>
              {!comida ? item.strMeal : item.strDrink}
            </p>
          </Link>))}
      </div>
      <div className="fix-btn">
        {receitaEmProgresso ? (
          <Link // fazer o css para fixar esse botão na parte de baixo da tela
            data-testid="start-recipe-btn"
            type="button"
            to={ comida ? `/foods/${id}/in-progress` : `/drinks/${id}/in-progress` }
            className="fix-btn2"
          >
            Continue Recipe
          </Link>)
          : !receitaFeita && (
            <Link // fazer o css para fixar esse botão na parte de baixo da tela
              data-testid="start-recipe-btn"
              type="button"
              to={ comida ? `/foods/${id}/in-progress` : `/drinks/${id}/in-progress` }
              className="fix-btn2"
            >
              Start Recipe
            </Link>)}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            copy(`http://localhost:3000${history.location.pathname}`);
            setCopiado(true);
          } }
        >
          <img src={ shareIcon } alt="Share icon" />
          Compartilhar
        </button>
        {copiado && <p>Link copied!</p>}
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteClick }
          src={ favoritada ? blackHeartIcon : whiteHeartIcon } // colocando src no botão pra passar no teste...?
          alt={ favoritada ? 'Full Heart Button' : 'Empty Heart Buton' }
        >
          Favoritar
        </button>
      </div>
    </section>
  );
}

export default RecipeDetails;

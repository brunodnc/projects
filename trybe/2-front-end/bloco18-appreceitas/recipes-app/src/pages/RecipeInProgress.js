import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FoodInProgress from '../components/FoodInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

import recipesContext from '../context/context';

function RecipeInProgress({ match }) {
  const {
    dataInProgress,
    setDataInProgress,
    setIngredients,
    setMeasures,
  } = useContext(recipesContext);
  const history = useHistory();
  const foods = history.location.pathname.includes('foods');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const endpoint = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`,
        );
        const response = await endpoint.json();
        setDataInProgress(response.meals[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (match.path.includes('foods')) {
      return fetchFoods();
    }
  }, [match.path, match.params.id, setDataInProgress]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const endpoint = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`,
        );
        const response = await endpoint.json();
        setDataInProgress(response.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (match.path.includes('drinks')) {
      return fetchDrinks();
    }
  }, [match.path, match.params.id, setDataInProgress]);

  useEffect(() => {
    const organizeIngredients = () => {
      const ingredientsFiltered = Object.entries(dataInProgress)
        .filter(([key, value]) => key.includes('Ingredient') && value)
        .map(([key, value]) => ({
          ingredient: value,
          done: false,
          key,
        }));
      setIngredients(ingredientsFiltered);
    };
    if (dataInProgress) {
      return organizeIngredients();
    }
  }, [dataInProgress, setIngredients]);

  useEffect(() => {
    const organizeMeasures = () => {
      const measuresFiltered = Object.entries(dataInProgress)
        .filter(([key, value]) => key.includes('Measure') && value)
        .map(([key, value]) => ({
          measure: value,
          key,
        }));
      setMeasures(measuresFiltered);
    };
    if (dataInProgress) {
      return organizeMeasures();
    }
  }, [dataInProgress, setMeasures]);

  return <div>{foods ? <FoodInProgress /> : <DrinkInProgress />}</div>;
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default RecipeInProgress;

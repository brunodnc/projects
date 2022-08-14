import React, { useContext, useEffect } from 'react';
import Header from '../components/Header/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';
import recipesContext from '../context/context';
import './styles/Drinks.css';
// import magicTwelve from './helpers';
import Recipes from '../components/Recipes';

function Drinks() {
  const { recipes, setRecipes } = useContext(recipesContext);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((raw) => raw.json())
      .then((data) => setRecipes(data.drinks));
  }, []);

  return (
    <div>
      <Header
        title="Drinks"
        profileIcon={ profileIcon }
        searchIcon={ searchIcon }
      />
      {recipes ? <Recipes /> : null}

      {/* <div className="drinks-container">
        {drinks ? (
          drinks.slice(0, magicTwelve).map((drink, index) => (
            <div
              className="drink-card"
              key={ drink.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="card-image"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
            </div>
          ))
        )}
      </div> */}
      <Footer />
    </div>
  );
}

export default Drinks;

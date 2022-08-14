import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipesProvider from './context/RecipesProvider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* Foods */}
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
        {/* Drinks */}
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        {/* Working on... */}
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/recipe-details" component={ RecipeDetails } />
        <Route exact path="/in-progress" component={ RecipeInProgress } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;

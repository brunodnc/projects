import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import ProductCart from './pages/ProductCart';
import Finish from './pages/Finish';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Search } />
        <Route exact path="/cart" component={ Cart } />
        <Route path="/finish" component={ Finish } />
        <Route path="/cart/:id" component={ ProductCart } />
        <Route path="*" component={ Error } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

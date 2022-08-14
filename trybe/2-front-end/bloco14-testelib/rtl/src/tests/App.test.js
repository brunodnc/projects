import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const { render, screen } = require('@testing-library/react');

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente App.js', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/ });
    const about = screen.getByRole('link', { name: /About/ });
    const favPokemons = screen.getByRole('link', { name: /Favorite Pokémons/ });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemons).toBeInTheDocument();
  });
  it(`Teste se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/ });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About
  , na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/ });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados
  , na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const favPokemons = screen.getByRole('link', { name: /Favorite Pokémons/ });
    userEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it(`Teste se a aplicação é redirecionada 
  para a página Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina404');
    const notFound = screen.getByRole('heading', { name: /Page requested not found/ });
    expect(notFound).toBeInTheDocument();
  });
});

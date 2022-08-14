import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FavoritePokemons from '../pages/FavoritePokemons';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente FavoritePokemons.js', () => {
  it(`Teste se é exibida na tela a mensagem No favorite pokemon found
  , caso a pessoa não tenha pokémons favoritos`, () => {
    render(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/);
    expect(msg).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ [{ id: 1, // mock pokemon
        name: 'pikachu',
        averageWeight: { measurementUnit: 1, value: 1 },
      }] }
    />);
    const pok = screen.getByText(/pikachu/);
    expect(pok).toBeInTheDocument();
  });
});

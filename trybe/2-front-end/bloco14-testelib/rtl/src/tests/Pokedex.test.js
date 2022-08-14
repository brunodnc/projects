import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente Pokedex.js', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/, level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo pokémon da 
  lista quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const next = screen.getByRole('button', { name: /Próximo pokémon/ });
    userEvent.click(next);
    const charm = screen.getByText(/Charmander/);
    expect(charm).toBeInTheDocument();
    // 8 click to return to pikachu
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    const pikachu = screen.getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const charm = screen.queryByText(/Charmander/);
    const pikachu = screen.getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
    expect(charm).not.toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    // Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição: (primeiro checa os botões que não fazem parte do resto do teste)
    screen.getAllByTestId('pokemon-type-button').forEach(
      (btn) => expect(btn).toBeInTheDocument(),
    );
    expect(screen.getByRole('button', { name: /Bug/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /Poison/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /Psychic/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /Normal/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /Dragon/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /Electric/ })).toBeVisible();
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    const fireBtn = screen.getByRole('button', { name: /Fire/ });
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    userEvent.click(fireBtn);
    expect(screen.getByText(/Charmander/)).toBeInTheDocument();
    expect(screen.queryByText(/Pikachu/)).not.toBeInTheDocument();
    // O botão All precisa estar sempre visível.
    expect(screen.getByRole('button', { name: /All/ })).toBeVisible();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    // O texto do botão deve ser All;
    const { history } = renderWithRouter(<App />);
    const resetBtn = screen.getByRole('button', { name: /All/ });
    const fireBtn = screen.getByRole('button', { name: /Fire/ });
    // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado;
    userEvent.click(fireBtn);
    userEvent.click(resetBtn);
    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
    userEvent.click(fireBtn);
    // Ao carregar a página, o filtro selecionado deverá ser All.
    history.push('/about');
    history.goBack();
    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
  });
});

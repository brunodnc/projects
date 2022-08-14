import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    // O nome correto do pokémon deve ser mostrado na tela;
    renderWithRouter(<App />);
    // O tipo correto do pokémon deve ser mostrado na tela;
    const type = screen.getAllByText(/Electric/);
    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida;
    const weight = screen.getByText(/Average weight: 6.0 kg/);
    // A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon.
    const img = document.querySelector('img');
    expect(type.length).toBe(2);
    expect(weight).toBeInTheDocument();
    expect(img.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
    expect(screen.getByAltText(/Pikachu sprite/)).toBeInTheDocument();
  });
  it(`Teste se o card do pokémon indicado na 
  Pokédex contém um link de navegação para exibir detalhes deste pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido`, () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getAllByRole('link')[3];
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it(`Teste se ao clicar no link 
  de navegação do pokémon, é feito o redirecionamento da aplicação
   para a página de detalhes de pokémon`, async () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);
    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const img = screen.getByAltText('Pikachu is marked as favorite');
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon exibido.
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

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

describe('Teste o componente PokemonDetails.js', () => {
  it(`Teste se as informações detalhadas do 
  pokémon selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    // A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;
    const details = screen.getByText(/Pikachu Details/);
    expect(details).toBeInTheDocument();
    // Não deve existir o link de navegação para os detalhes do pokémon selecionado;
    expect(screen.queryByText(/More details/)).toBeFalsy();
    // A seção de detalhes deve conter um heading h2 com o texto Summary;
    expect(screen.getByRole('heading', { name: /Summary/, level: 2 }))
      .toBeInTheDocument();
    // A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado.
    expect(screen.getByText(/This intelligent Pokémon/)).toBeInTheDocument(); // testa especificamente com o Pikachu, o primeiro pokemon que se clica.
  });
  it(`Teste se existe na página uma seção 
  com os mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do pokémon exibido;
    const h2 = screen.getByRole('heading', { name: /Game Locations of Pikachu/ });
    expect(h2).toBeInTheDocument();
    // Todas as localizações do pokémon devem ser mostradas na seção de detalhes;
    const loc1 = screen.getByText(/Kanto Viridian Forest/);
    const loc2 = screen.getByText(/Kanto Power Plant/);
    expect(loc1).toBeInTheDocument();
    expect(loc2).toBeInTheDocument();
    // Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;
    const imgs = screen.getAllByRole('img');
    // A imagem da localização deve ter um atributo src com a URL da localização;
    expect(imgs[1]).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(imgs[2]).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do pokémon.
    expect(imgs[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(imgs[2]).toHaveAttribute('alt', 'Pikachu location');
  });
  it(`Teste se o usuário pode favoritar um 
pokémon através da página de detalhes`, () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    // A página deve exibir um checkbox que permite favoritar o pokémon;
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    // O label do checkbox deve conter o texto Pokémon favoritado?.
    const label = screen.getByLabelText('Pokémon favoritado?');
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon da lista de favoritos;
    expect(label).toBeChecked();
    userEvent.click(label);
    expect(label).not.toBeChecked();
  });
});

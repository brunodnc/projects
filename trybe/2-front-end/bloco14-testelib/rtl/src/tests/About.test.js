import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Teste o componente About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: /About Pokédex/ });
    const p = [
      screen.getByText(/This application simulates a Pokédex, a digital/),
      screen.getByText(/One can filter Pokémons by type/),
    ];
    const img = document.querySelector('img');
    expect(heading).toBeInTheDocument();
    expect(p[0]).toBeInTheDocument();
    expect(p[1]).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  //   it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {

  //   });
  //   it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {

  //   });
//   it(`Teste se a página contém a
//   seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
//   });
});

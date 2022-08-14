import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound.js', () => {
  it(`Teste se a página contém um heading h2 com 
  o texto Page requested not found 😭`, () => {
    render(<NotFound />);
    const h2 = screen.getByRole('heading', { name: /Page requested not found/,
      level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const img = document.querySelector('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

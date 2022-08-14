import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAILINPUT = 'email-input';
const PASSWORDINPUT = 'password-input';
const PROFILEIMG = 'profile-top-btn';
const EMAILTEST = 'a@gmail.com';

const copy = require('clipboard-copy');

// Referencia https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest/67645603#67645603

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Teste da página Favorite Recipes', () => {
  jest.spyOn(navigator.clipboard, 'writeText');
  beforeAll(() => {
    copy('http://localhost:3000/drinks/15997');
  });
  it('Teste do Favorite Recipes', async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAILINPUT);
    const inputPassword = screen.getByTestId(PASSWORDINPUT);
    const btnEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, EMAILTEST);
    userEvent.type(inputPassword, '1234567');
    expect(btnEnter).toBeEnabled();

    userEvent.click(btnEnter);

    // setanto valores no local Storage
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '15997',
      type: 'drink',
      category: 'drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: ['tag'] }, { id: '53060',
      type: 'food',
      nationality: 'Croatian',
      category: 'Side',
      alcoholicOrNot: 'Non alcoholic',
      name: 'Burek',
      image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: ['tag'] }]));
    expect(localStorage.getItem('doneRecipes')).not.toBe(null);
    // fim do login e indo para favoritos
    history.push('/done-recipes');

    // testando os itens na tela

    const buttonProfile = screen.getByTestId(PROFILEIMG);
    expect(buttonProfile).toBeInTheDocument();
    const textProfile = screen.getByTestId('page-title');
    expect(textProfile).toBeInTheDocument();
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(buttonDrinks).toBeInTheDocument();
    const buttonFoods = screen.getByTestId('filter-by-food-btn');
    expect(buttonFoods).toBeInTheDocument();
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    expect(buttonAll).toBeInTheDocument();

    // testando os botoes de all, drinks e foods
    console.log(localStorage.getItem('doneRecipes'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByText(/gg/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('filter-by-food-btn'));
    expect(screen.getByText(/burek/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByText(/burek/i)).toBeInTheDocument();
    expect(screen.getByText(/gg/i)).toBeInTheDocument();

    // testando a mgs de copiado
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getAllByText(/Link copied/i)[0]).toBeInTheDocument();
  });
});

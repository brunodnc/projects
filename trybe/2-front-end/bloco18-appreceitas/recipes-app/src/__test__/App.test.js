import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAILINPUT = 'email-input';
const PASSWORDINPUT = 'password-input';
// const PROFILEIMG = 'profile-top-btn';
const EMAILTEST = 'a@gmail.com';
const SEARCH_INPUT = 'search-input';

describe('Teste do componente Login', () => {
  it('Teste do componente Login', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAILINPUT);
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId(PASSWORDINPUT);
    expect(inputPassword).toBeInTheDocument();
    const btnEnter = screen.getByTestId('login-submit-btn');
    expect(btnEnter).toBeInTheDocument();
    expect(btnEnter).toBeDisabled();

    userEvent.type(inputEmail, EMAILTEST);
    userEvent.type(inputPassword, '1234567');
    expect(btnEnter).toBeEnabled();
  });

  it('Teste o redirecionamento para  /foods ao clicar no botao enter', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const inputEmail = screen.getByTestId(EMAILINPUT);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId(PASSWORDINPUT);
    expect(inputPassword).toBeInTheDocument();
    const btnEnter = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, EMAILTEST);
    expect(inputEmail).toHaveValue(EMAILTEST);
    userEvent.type(inputPassword, 'pppppppp');

    expect(btnEnter).toBeEnabled();

    userEvent.click(btnEnter);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
  });
});

describe('Testando o componente Header', () => {
  it('Verifica se exite um título no componente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const title = screen.getByRole('heading', { name: /foods/i });
    expect(title).toBeInTheDocument();
  });
  it('Deve existir um ícone de perfil do usuário e um de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileIcon = screen.getByAltText('profile');
    const searchIcon = screen.getByAltText('search');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  it('Ao clicar no ícone de perfil, deve redirecionar para a página de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileIcon = screen.getByAltText('profile');
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
  it('Ao clicar no ícone de pesquisa, deve aparecer o input de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchIcon = screen.getByAltText('search');
    userEvent.click(searchIcon);
    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    expect(inputSearch).toBeInTheDocument();
  });
});

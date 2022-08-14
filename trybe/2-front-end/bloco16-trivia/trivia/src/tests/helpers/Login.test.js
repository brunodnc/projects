import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Fonte: https://stackoverflow.com/questions/67321204/jest-mockimplementationpromise-resolve-returns-undefined-when-spying-on-an-obj
const mockApi = () => {
  const mockToken = {
    token: '122862555'
  }
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockToken),
    }));
};

describe('Testes Login', () => {

  it('Verifica se o input de Nome está na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByLabelText(/name:/i);
    expect(inputName).toBeInTheDocument();
  })

  it('Verifica se o input de Email está na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText(/email:/i);
    expect(inputEmail).toBeInTheDocument();
  })

  it('Verifica se ao clicar o botão de Play está na tela', () => {
   renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();

  })

  it('Verifica se o botão de Settings está na tela', () => {
    renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).toBeInTheDocument();
  })

  it('Verifica se ao entar na tela de Login, o botão Play está desabilitado', () => {
    renderWithRouterAndRedux(<App />)

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeDisabled();

    const inputEmail = screen.getByLabelText(/email:/i);
    const inputName = screen.getByLabelText(/name:/i);

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputName, 'teste');

    expect(playButton).not.toBeDisabled();
  })

  it('Verifica se ao clicar no botão Play a página é redirecionada', async () => {
    mockApi()
    const { history } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeDisabled();

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');


    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  })

  it('Verifica se ao clicar no botão Settings a página é redirecionada', async () => {
    mockApi()
    const { history } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeDisabled();

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');

    expect(playButton).not.toBeDisabled();

    const settingsButton = screen.getByRole('button', { name: /settings/i })
    userEvent.click(settingsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
})
})
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const SEARCH_BUTTON = 'exec-search-btn';

describe('Testando o componente SearchBar', () => {
  it('Ao clicar no ícone de pesquisa, deve aparecer os elementos do SearchBar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchIcon = screen.getByAltText('search');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(inputSearch).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Testa a aplicação ao pesquisar uma receita pelo nome "chicken"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    userEvent.click(screen.getByAltText('search'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const getRecipeName = await screen.findByText('Chicken Handi');
    expect(getRecipeName).toBeInTheDocument();
  });

  it('Testa a aplicação ao pesquisar uma receita pelo ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    userEvent.click(screen.getByAltText('search'));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'pepper');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const getRecipeName = await screen.findByText('Beef Lo Mein');
    expect(getRecipeName).toBeInTheDocument();
  });

  it('Testa a aplicação ao pesquisar uma receita pela primeira letra', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    userEvent.click(screen.getByAltText('search'));
    userEvent.click(screen.getByTestId(FIRST_LETTER_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'c');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const getRecipeName = await screen.findByText('Chocolate Gateau');
    expect(getRecipeName).toBeInTheDocument();
  });
  it(`Testa se ao selecionar o radio "first letter" e 
      digitar mais de 2 letras no input, gera um alerta de erro`, async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    userEvent.click(screen.getByAltText('search'));
    userEvent.click(screen.getByTestId(FIRST_LETTER_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'ca');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  it(`Testa se ao receber uma o retorno 
      de apenas um item, redireciona para a página de detalhes desse item`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    userEvent.click(screen.getByAltText('search'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'bleeding');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    history.push('/drinks/16295');

    expect(history.location.pathname).toBe('/drinks/16295');
  });

  it(`Deve verificar se ao entrar na tela de pesquisa,
      o radio "name" já vai estar selecionado`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    userEvent.click(screen.getByAltText('search'));
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    expect(nameRadio).toHaveProperty('defaultChecked');
  });

  it('Testa a aplicação ao pesquisar um drink pelo nome "vodka"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    userEvent.click(screen.getByAltText('search'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'vodka');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    const getRecipeName = await screen.findByText('Long vodka');
    expect(getRecipeName).toBeInTheDocument();
  });

  it(`Verifica se ao clicar no ícone 
    inferior de drinks vai para a página de drinks`, async () => {

  });
});

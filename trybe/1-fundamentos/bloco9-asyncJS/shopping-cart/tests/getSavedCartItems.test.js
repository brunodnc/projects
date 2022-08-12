const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test(`Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado`, () => {
    expect(getSavedCartItems()).toHaveBeenCalledWith(localStorage.getItem);
  })
  test(`Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o 'cartItems' como parâmetro.`, () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('Teste se fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  })
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    expect(await fetchProducts('computador')).toHaveBeenCalled();
  })
  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    expect(await fetchProducts('computador')).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  })
  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(await fetchProducts('computador')).toStrictEqual(computadorSearch);
  })
  test(`Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.`, async () => {
    expect(await fetchProducts()).toThrow(new Error('You must provide an url'));
  })
});
 
require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('Teste se fetchItem é uma função', async () => {
    expect(typeof fetchItem).toBe('function');
  })
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    expect(await fetchItem("MLB1615760527")).toHaveBeenCalled()
  })
  test('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect(await fetchItem("MLB1615760527")).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527")
  })
  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    expect(await fetchItem("MLB1615760527")).toStrictEqual(item);
  })
  test(`Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.`, async () => {
    expect(await fetchItem()).toThrow(new Error('You must provide an url'));
  })
});
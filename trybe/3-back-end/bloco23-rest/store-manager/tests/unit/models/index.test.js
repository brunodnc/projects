const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const model = require('../../../src/models');
const { productList, newProduct, newSales, salesReturn, salesList, sale, updatedProduct } = require('../mocks');

describe('Testes unitários da camada model', async () => {
  afterEach(sinon.restore);
  it('Testa a função getAllProducts', async () => {
    sinon.stub(connection, 'execute').returns([productList]);
    const result = await model.getAllProducts();
    expect(result).to.equal(productList);
  });
  
  it('Testa a função getProductById', async () => {
    sinon.stub(connection, 'execute').returns([[productList[0]]]);
    const result = await model.getProductById(1);
    expect(result).to.be.deep.equal(productList[0]);
  })

  it('Testa a função createProducts', async () => {
    sinon.stub(connection, 'query').returns([{insertId: 1}]);
    sinon.stub(connection, 'execute').returns([[newProduct]]);
    const result = await model.createProduct(newProduct.name);
    expect(result).to.be.deep.equal(newProduct);
  });

  it('testa a atualização de produto', async () => {
    sinon.stub(connection, 'execute').returns([1]);
    const result = await model.updateProduct(1, 'Martelo do Batman');
    expect(result).to.be.deep.equal(1);
  });
  
  it('Testa a criação das sales', async () => {
    const stub = sinon.stub(connection, 'query');
    stub.onCall(0).returns([{ insertId: 3 }])
    stub.onCall(1).returns(true)
    stub.onCall(2).returns(true)
    const result = await model.createSales(newSales);
    expect(result).to.be.deep.equal(salesReturn);
  });

  it('Testa a função getAllSales', async () => {
    sinon.stub(connection, 'execute').returns([salesList]);
    const result = await model.getAllProducts();
    expect(result).to.equal(salesList);
  });

  it('Testa a função getSaleById', async () => {
    sinon.stub(connection, 'execute').returns([sale]);
    const result = await model.getSaleById(1);
    expect(result).to.equal(sale);
  });
});
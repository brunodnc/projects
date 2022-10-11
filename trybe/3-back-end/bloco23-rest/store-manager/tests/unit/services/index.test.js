const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models');
const service = require('../../../src/services');
const { productList, newProduct, newSales, salesReturn, salesList, sale, updatedProduct } = require('../mocks');

describe('Testes unitários da camada services', async () => {
  afterEach(sinon.restore);
  it('Testa a função getAllProducts', async () => {
    sinon.stub(model, 'getAllProducts').returns(productList);
    const result = await service.getAllProducts();
    expect(result).to.equal(productList);
  });
  
  it('Testa a função getProductById', async () => {
    sinon.stub(model, 'getProductById').returns(productList[0]);
    const result = await service.getProductById(1);
    expect(result).to.be.deep.equal(productList[0]);
  });

  it('Testa a função createProduct', async () => {
    sinon.stub(model, 'createProduct').returns(newProduct);
    const result = await service.createProduct(newProduct.name);
    expect(result).to.be.deep.equal(newProduct);
  });

  it('Testa a função updateProduct', async () => {
    sinon.stub(model, 'updateProduct').returns(updatedProduct);
    sinon.stub(service, 'getProductById').returns(updatedProduct);
    sinon.stub(model, 'getProductById').returns(updatedProduct);
    const result = await service.updateProduct(1, 'Martelo do Batman');
    expect(result).to.be.deep.equal(updatedProduct);
  })

  it('Teste o service de createSales', async () => {
    sinon.stub(model, 'createSales').returns(salesReturn);
    sinon.stub(model, 'getProductById').returns(true); // this function is tested elsewhere, and it functions as a validation to ids inserts
    const result = await service.createSales(newSales);
    expect(result).to.be.deep.equal(salesReturn);
  })

  it('Testa a função getAllSales', async () => {
    sinon.stub(model, 'getAllSales').returns(salesList);
    const result = await service.getAllSales();
    expect(result).to.be.deep.equal(salesList);
  });

  it('Testa a função getSaleById', async () => {
    sinon.stub(model, 'getSaleById').returns(sale);
    const result = await service.getSaleById(1);
    expect(result).to.be.deep.equal(sale);
  });
});
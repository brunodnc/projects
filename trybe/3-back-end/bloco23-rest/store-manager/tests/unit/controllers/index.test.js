const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const service = require('../../../src/services');
const { productList, newProduct, newSales, salesReturn, salesList, sale, updatedProduct } = require('../mocks');
const controller = require('../../../src/controllers');
const model = require('../../../src/models')
const errorHandler = require('../../../src/middlewares');

chai.use(chaiHttp);


describe('Testes de unidade dos controllers...', async () => {

  afterEach(sinon.restore);

  it('listando todos os produtos', async () => {
    sinon.stub(service, 'getAllProducts').resolves(productList);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.getAllProducts(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, productList);
  });

  it('listando um produto baseado no id', async () => {
    sinon.stub(service, 'getProductById').resolves(productList[0]);
    const req = { params: 1 };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.getProductById(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, productList[0]);
  });

  it('criando produtos', async () => {
    sinon.stub(service, 'createProduct').resolves(newProduct);
    const res = {};
    const req = { body: { name: 'ProdutoX' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.createProduct(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, newProduct);
  });

  it('criando sales', async () => {
    sinon.stub(service, 'createSales').resolves(salesReturn)
    const res = {};
    const req = { body: newSales };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.createSales(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, salesReturn);
  });

  it('testando erros de createSale', async () => {
    sinon.stub(model, 'createSales').returns(true);
    sinon.stub(model, 'getProductById').returns(undefined);
    const res = {};
    const req = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 99999, quantity: 5 },
      ]
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.createSales(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { message: "Product not found" });
  });

  it('listando todas as sales', async () => {
    sinon.stub(service, 'getAllSales').resolves(salesList)
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.getAllSales(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, salesList);
  });

  it('listando uma sale baseado no id', async () => {
    sinon.stub(service, 'getSaleById').resolves(sale);
    const res = {};
    const req = { params: {id: 1}};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.getSaleById(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, sale);
  });

  it('fazendo update em um product', async () => {
    sinon.stub(service, 'updateProduct').resolves(updatedProduct);
    const res = {};
    const req = { params: {id: 1}, body: { name: 'Martelo do Batman' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.updateProduct(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, updatedProduct);
  });
  
  it('deletando um product', async () => {
    sinon.stub(service, 'deleteProduct').resolves(true);
    const res = {};
    const req = { params: {id: 1} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await controller.deleteProduct(req, res, errorHandler);
    sinon.assert.calledWith(res.status, 204);
  });
});
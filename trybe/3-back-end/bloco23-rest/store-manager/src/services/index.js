const model = require('../models');

// products 
const pnt = 'Product not found';

const getAllProducts = async () => {
  const allProducts = await model.getAllProducts();
  return allProducts;
};

const getProductById = async (id) => {
  const product = await model.getProductById(id);
  if (!product || (product instanceof Array && !product.length)) {
    throw new Error('404', { cause: { status: 404, message: pnt } });
  }
  return product;
};

const createProduct = async (name) => {
  if (!name) throw new Error({ status: 400, message: '"name" is required' });
  if (name.length < 5) {
    throw new Error('422',
      { cause: { status: 422, message: '"name" length must be at least 5 characters long' } });
  }
  const createdProduct = await model.createProduct(name);
  const product = { id: createdProduct.id, name: createdProduct.name };
  return product;
};

const updateProduct = async (id, name) => {
  if (!name) throw new Error({ status: 400, message: '"name" is required' });
  if (name.length < 5) {
    throw new Error('422',
      { cause: { status: 422, message: '"name" length must be at least 5 characters long' } });
  }
  await getProductById(id);
  const updatedProduct = await model.updateProduct(id, name);
  return getProductById(updatedProduct);
};

const deleteProduct = async (id) => {
  await getProductById(id);
  const deletedProduct = await model.deleteProduct(id);
  return deletedProduct;
};

// sales

const validateSales = (sales) => sales.reduce((prev, cur) => {
    if (prev) return prev;
  const { productId, quantity } = cur;
    if (!productId) {
      return { status: 400, message: '"productId" is required' };
    }
    if (quantity < 1) {
      return { status: 422, message: '"quantity" must be greater than or equal to 1' };
    } 
    if (!quantity) {
      return { status: 400, message: '"quantity" is required' };
    }
      return false;
}, false);

const validateProductsId = async (sales) => {
  const productArr = await Promise.all(sales.map(({ productId }) => {
    const product = model.getProductById(productId);
    return product;
  }));
  const erro = productArr.some((e) => e === undefined);
  if (erro) return { status: 404, message: pnt };
  return false;
};

const createSales = async (sales) => {
  const errorObj = validateSales(sales);
  if (errorObj) throw new Error('400', { cause: errorObj });
  const productError = await validateProductsId(sales);
  if (productError) throw new Error('404', { cause: productError });
  const createdSales = await model.createSales(sales);
  return createdSales;
};

const getSaleById = async (id) => {
  const sale = await model.getSaleById(id);
  if (!sale || (sale instanceof Array && !sale.length)) {
    throw new Error('404', { cause: { status: 404, message: 'Sale not found' } }); 
}
  return sale;
};

const getAllSales = async () => {
  const sales = await model.getAllSales();
  return sales;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createSales,
  getAllSales,
  getSaleById,
};
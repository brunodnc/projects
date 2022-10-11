const service = require('../services');

// products

const getAllProducts = async (req, res, next) => {
  try {
    const products = await service.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    next(err, req, res);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getProductById(id);
    return res.status(200).json(product);
  } catch (err) {
    next(err, req, res);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const createdProduct = await service.createProduct(name);
    return res.status(201).json(createdProduct);
  } catch (err) {
    next(err, req, res);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const updatedProduct = await service.updateProduct(id, name);
    return res.status(200).json(updatedProduct);
  } catch (err) {
    next(err, req, res);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const d = await service.deleteProduct(id);
    return res.status(204).json(d);
  } catch (err) {
    next(err, req, res);
  }
};

// sales

const createSales = async (req, res, next) => {
  try {
    const sales = req.body;
    const createdSales = await service.createSales(sales);
    return res.status(201).json(createdSales);
  } catch (err) {
    next(err, req, res);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const sales = await service.getAllSales();
    return res.status(200).json(sales);
  } catch (err) {
    next(err, req, res);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await service.getSaleById(id);
    return res.status(200).json(sale);
  } catch (err) {
    next(err, req, res);
  }
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
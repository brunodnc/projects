const connection = require('./connection');

// products

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
};

const createProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products(name) VALUES (?)';
  const [result] = await connection.query(query, [name]);
  const produto = await getProductById(result.insertId);
  return produto;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  await connection.execute(query, [name, id]);
  return id;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

// sales
    
const createSales = async (sales) => {
  const querySales = 'INSERT INTO StoreManager.sales(date) VALUES (NOW());';
  const [result] = await connection.query(querySales);
  const saleId = result.insertId;
  await Promise.all(sales.map(({ productId, quantity }) => {
    connection.query(
      'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?);',
      [saleId, productId, quantity],
      );
      return true;
    }));
  const resultObj = {
    id: saleId,
    itemsSold: sales,
  };
  return resultObj;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
   FROM StoreManager.sales s INNER JOIN StoreManager.sales_products sp 
   ON s.id = sp.sale_id
   ORDER BY s.id, sp.product_id;`,
  );
  return result;
};

const getSaleById = async (id) => {
  const query = `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales s INNER JOIN StoreManager.sales_products sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY s.id;`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  createSales,
  updateProduct,
  deleteProduct,
  getAllSales,
  getSaleById,
};
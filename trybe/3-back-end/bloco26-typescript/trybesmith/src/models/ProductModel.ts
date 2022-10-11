// mysql2/promise
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IOrder, IProduct } from '../interfaces';

class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async registerProduct(product: IProduct) {
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);';
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      query,
      [product.name, product.amount],
    );
    return { id: insertId, ...product };
  }

  async getProducts(): Promise<IProduct[]> {
    const query = 'SELECT * FROM Trybesmith.Products;';
    const [products] = await this.connection.execute(query);
    return products as IProduct[];
  }

  async getOrders(): Promise<IOrder[]> {
    const query = `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds 
    FROM Trybesmith.Orders o
    INNER JOIN Trybesmith.Products p
    ON p.orderId = o.id
    GROUP BY p.orderId;`;
    const [orders] = await this.connection.execute(query);
    return orders as IOrder[];
  }
}

export default ProductModel;

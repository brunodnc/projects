import { IOrder, IProduct } from '../interfaces';
import ProductModel from '../models/ProductModel';
import connection from '../models/connection';

class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  async registerProduct(product: IProduct): Promise<IProduct> {
    const registeredProduct: IProduct = await this.model.registerProduct(product);
    return registeredProduct;
  }

  async getProducts(): Promise<IProduct[]> {
    const products = await this.model.getProducts();
    return products;
  }

  async getOrders(): Promise<IOrder[]> {
    const orders = await this.model.getOrders();
    return orders;
  }
}

export default ProductService;

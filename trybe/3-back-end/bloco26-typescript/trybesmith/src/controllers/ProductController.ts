import { Request, Response } from 'express';
import { IOrder, IProduct } from '../interfaces';
import ProductService from '../services/ProductService';

class ProductController {
  service = new ProductService();

  async registerProduct(req: Request, res: Response) {
    const product: IProduct = req.body;
    const registeredProduct: IProduct = await this.service.registerProduct(product);
    return res.status(201).json(registeredProduct);
  }

  async getProducts(req: Request, res: Response) {
    const products: IProduct[] = await this.service.getProducts();
    return res.status(200).json(products);
  }

  async getOrders(req: Request, res: Response) {
    const orders: IOrder[] = await this.service.getOrders();
    return res.status(200).json(orders);
  }
}

export default ProductController;

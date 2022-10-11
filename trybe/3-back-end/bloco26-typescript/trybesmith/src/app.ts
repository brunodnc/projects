import express from 'express';
import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';

const app = express();

app.use(express.json());

const productController = new ProductController();
const userController = new UserController();

app.post('/products', productController.registerProduct.bind(productController));
app.get('/products', productController.getProducts.bind(productController));
app.post('/users', userController.registerUser.bind(userController));
app.get('/orders', productController.getOrders.bind(productController));
app.post('/login', userController.login.bind(userController));

export default app;

const express = require('express');
const errorHandler = require('./middlewares');
const controller = require('./controllers'); 

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// products
app.get('/products/', controller.getAllProducts);
app.get('/products/:id', controller.getProductById);
app.post('/products/', controller.createProduct);
app.put('/products/:id', controller.updateProduct);
app.delete('/products/:id', controller.deleteProduct);
// sales
app.get('/sales/', controller.getAllSales);
app.get('/sales/:id', controller.getSaleById);
app.post('/sales/', controller.createSales);

app.use(errorHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
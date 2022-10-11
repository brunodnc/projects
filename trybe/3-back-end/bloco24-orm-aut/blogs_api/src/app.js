const express = require('express');
const controller = require('./controllers');

// ...

const app = express();

app.use(express.json());

app.post('/login', controller.login);
app.post('/user', controller.addUser);
app.get('/user', controller.validateToken, controller.getUsers);
app.get('/user/:id', controller.validateToken, controller.getUserById);
app.post('/categories', controller.validateToken, controller.addCategory);
app.get('/categories', controller.validateToken, controller.getCategories);
app.post('/post', controller.validateToken, controller.addBlogPost);
app.get('/post', controller.validateToken, controller.getBlogPosts);
app.get('/post/:id', controller.validateToken, controller.getBlogPostById);
app.put('/post/:id', controller.validateToken, controller.updateBlogPost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

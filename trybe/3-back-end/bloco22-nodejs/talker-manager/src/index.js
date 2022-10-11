const express = require('express');
const bodyParser = require('body-parser');
const talkerController = require('./controller/talkerController');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.post('/login', talkerController.emailValidation,
  talkerController.passwordValidation,
  talkerController.generateLoginToken);

app.route('/talker')
  .get(talkerController.all)
  .post(talkerController.authCheck,
    talkerController.validateNameAge,
    talkerController.validateDate,
    talkerController.validateRate,
    talkerController.addTalker);

    app.get('/talker/search?', talkerController.authCheck, talkerController.getTalkerByQuery);

    app.route('/talker/:id')
  .get(talkerController.getTalkerById)
  .put(talkerController.authCheck,
    talkerController.validateNameAge,
    talkerController.validateDate,
    talkerController.validateRate, talkerController.updateTalker)
  .delete(talkerController.authCheck, talkerController.deleteTalkerById);

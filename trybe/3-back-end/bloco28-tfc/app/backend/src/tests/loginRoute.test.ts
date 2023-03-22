import * as sinon from "sinon";
import * as chai from "chai";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Users from "../database/models/Users";

chai.use(chaiHttp);

const { expect } = chai;

const VALID_USER = {
  id: 1,
  username: "username",
  role: "admin",
  email: "exemple@email.com",
  password: "hashed_password",
};

const VALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZSIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiZXhlbXBsZUBlbWFpbC5jb20iLCJwYXNzd29yZCI6Imhhc2hlZF9wYXNzd29yZCJ9.w80bB1QW61B3LmFK7-Vzn1jWCMWhTHxQtVQsi0c_tQY";

describe("Testa a rota de login", () => {
  // let chaiHttpResponse: Response;
  before(async () => sinon.stub(Users, "findOne").resolves(VALID_USER as Users));
  
  it("testa se um login válido retorna o token", async () => {
    const result = await chai.request(app).post('/login').send({email: VALID_USER.email, password: VALID_USER.password});
    expect(result.status).equal(200);
    expect(result.body).property('token');
    expect(result.body).equal({token: VALID_TOKEN});
  });

  it("testa se um login sem email retorna erro", async () => {
    const result = await chai.request(app).post('/login').send({password: VALID_USER.password});
    expect(result.status).equal(400);
    expect(result.body).equal({ message: 'All fields must be filled' });
  });

  it("testa se um login sem senha retorna erro", async () => {
    const result = await chai.request(app).post('/login').send({email: VALID_USER.email});
    expect(result.status).equal(400);
    expect(result.body).equal({ message: 'All fields must be filled' });
  });

  it("testa se um login com e-mail inválido retorna erro", async () => {
    const result = await chai.request(app).post('/login').send({email: 'emailerrado', password: VALID_USER.password});
    expect(result.status).equal(400);
    expect(result.body).equal({ message: 'Incorrect email or password' });
  });

  it("testa se um login com senha inválida retorna erro", async () => {
    const result = await chai.request(app).post('/login').send({email: VALID_USER.email, password: '123'});
    expect(result.status).equal(400);
    expect(result.body).equal({ message: 'Incorrect email or password' });
  });
  // stub pro bcrypt apenas para o teste seguinte
  before(() => sinon.stub(bcrypt, "compare").resolves(false));
  it("testa se estoura o erro com senha errada", async () => {
    const result = await chai.request(app).post('/login').send({email: VALID_USER.email, password: 'senhaincorreta'});
    expect(result.status).equal(400);
    expect(result.body).equal({ message: 'Incorrect email or password' });
  })
  after(() => (Users.findOne as sinon.SinonStub).restore());
});

describe('testa a rota de validação', () => {
  before(async () => {
    sinon.stub(Users, "findOne").resolves(VALID_USER as Users);
    sinon.stub(jwt, 'verify').resolves(VALID_USER as Users);
  });

  it ('verifica se retorna a role corretamente', async () => {
    const result = await chai.request(app).get('/login/validate').set('authorization', VALID_TOKEN);
    expect(result.status).equal(200);
    expect(result.body).equal({ role: VALID_USER.role });
  });
  
  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });
})

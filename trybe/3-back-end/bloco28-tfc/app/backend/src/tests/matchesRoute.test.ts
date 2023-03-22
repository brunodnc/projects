import * as sinon from "sinon";
import * as chai from "chai";
import * as jwt from 'jsonwebtoken';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Matches from "../database/models/Matches";

import { Response } from "superagent";
import { IMatch } from "../interfaces";
import Users from "../database/models/Users";

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZSIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiZXhlbXBsZUBlbWFpbC5jb20iLCJwYXNzd29yZCI6Imhhc2hlZF9wYXNzd29yZCJ9.w80bB1QW61B3LmFK7-Vzn1jWCMWhTHxQtVQsi0c_tQY";

const VALID_MATCHES = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
        "id": 2,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ];

const VALID_NEW_MATCH = {
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
}
const VALID_USER = {
    id: 1,
    username: "username",
    role: "admin",
    email: "exemple@email.com",
    password: "hashed_password",
  };

  const VALID_MATCH_UPDATE_BODY = {
      homeTeamGoals: 3,
      awayTeamGoals: 1,
  };

describe("Testa a rota matches", () => {
  before(async () => {
    sinon.stub(Matches, "findAll").resolves(VALID_MATCHES as unknown as Matches[]);
    sinon.stub(Matches, "findByPk").resolves(VALID_MATCHES[0] as unknown as Matches);
    sinon.stub(Matches, "create").resolves({ id: 1 } as unknown as Matches);
    sinon.stub(Matches, "update").resolves([1, VALID_MATCHES as unknown as Matches[]]);
    sinon.stub(jwt, 'verify').resolves(VALID_USER as Users);
    sinon.stub(Users, "findOne").resolves(VALID_USER as Users);
  });
  
  it("testa se a rota matches retorna todos os times ", async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_MATCHES);
  });

  it("testa se a rota matches com parâmetro 1 retorna a partida de id 1", async () => {
    const result = await chai.request(app).get('/matches/1');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_MATCHES[0]);
  });

  it("testa se a rota matches pode ser filtrada com query param", async () => {
    // gives filtered stub
    (Matches.findAll as sinon.SinonStub).restore();
    sinon.stub(Matches, "findAll").resolves(VALID_MATCHES.filter(m => m.inProgress) as unknown as Matches[]);
    
    const result = await chai.request(app).get('/matches?inProgress=true');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_MATCHES[0]);

    // takes filtered stub away and restores old stub
    (Matches.findAll as sinon.SinonStub).restore();
    sinon.stub(Matches, "findAll").resolves(VALID_MATCHES as unknown as Matches[]);
  });

  it("testa se pode ser criada uma partida com sucesso", async () => {
    const result = await chai.request(app).post('/matches').set('authorization', VALID_TOKEN).send(VALID_NEW_MATCH);
    expect(result.status).equal(201);
    expect(result.body).equal({ id: 1, ...VALID_NEW_MATCH});
  });

  it("testa se retorna erro com a falta do token ao criar", async () => {
    const result = await chai.request(app).post('/matches').send(VALID_NEW_MATCH);
    expect(result.status).equal(401);
    expect(result.body).equal({ message: 'Token must be a valid token' });
  });

  it("testa se retorna erro com a token inválido ao criar", async () => {
    const result = await chai.request(app).post('/matches').set('authorization', 'invalidotken').send(VALID_NEW_MATCH);
    expect(result.status).equal(401);
    expect(result.body).equal({ message: 'Token must be a valid token' });
  });

  it("testa se retorna erro criando partida com dois times iguais", async () => {
    const result = await chai.request(app).post('/matches').set('authorization', VALID_TOKEN).send({...VALID_NEW_MATCH, homeTeam: 1, awayTeam: 1});
    expect(result.status).equal(422);
    expect(result.body).equal({
        message: 'It is not possible to create a match with two equal teams',
      });
  });

  it("testa se retorna erro se tentar inserir time com id inválido", async () => {
    (Matches.create as sinon.SinonStub).restore();
    sinon.stub(Matches, "create").resolves();
    const result = await chai.request(app).post('/matches').set('authorization', VALID_TOKEN).send({...VALID_NEW_MATCH, homeTeam: 99999, awayTeam: -2323});
    expect(result.status).equal(404);
    expect(result.body).equal({
        message: 'There is no team with such id!',
      });
    (Matches.create as sinon.SinonStub).restore();
    sinon.stub(Matches, "create").resolves({ id: 1 } as unknown as Matches);
  });

  it("testa se é possível atualizar partidas em andamento com base no id", async () => {
    const result = await chai.request(app).patch('/matches/2').send(VALID_MATCH_UPDATE_BODY);
    expect(result.status).equal(200);
    expect(result.body).equal({ update: 1 });
  })

  it("testa se é possível finalizar uma partida", async () => {
    (Matches.findByPk as sinon.SinonStub).restore();
    sinon.stub(Matches, "findByPk").resolves(VALID_MATCHES[1] as unknown as Matches);

    const result = await chai.request(app).patch('/matches/2/finish');
    expect(result.status).equal(200);
    expect(result.body).equal({ message: 'Finished' });

    (Matches.findByPk as sinon.SinonStub).restore();
    sinon.stub(Matches, "findByPk").resolves(VALID_MATCHES[0] as unknown as Matches);
  });

  it("testa se é lançado erro quando se tenta finalizar uma partida já finalizada", async () => {
    const result = await chai.request(app).patch('/matches/2/finish');
    expect(result.status).equal(500);
    expect(result.body).equal({ message: 'Match not in progress' });
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
    (Matches.create as sinon.SinonStub).restore();
    (Matches.findByPk as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });
})

import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Teams from "../database/models/Teams";

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TEAMS = [
  {id: 1, teamName: 'time1'},
  {id: 2, teamName: 'time2'},
  {id: 3, teamName: 'time3'}
];

const VALID_TEAM = {id: 1, teamName: 'time1',};

describe("Testa a rota teams", () => {
  before(async () => {
    sinon.stub(Teams, "findAll").resolves(VALID_TEAMS as Teams[]);
    sinon.stub(Teams, "findByPk").resolves(VALID_TEAM as Teams);
  });
  
  it("testa se a rota teams retorna todos os times ", async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_TEAMS);
  });

  it("testa se é possível receber apenas um item passando o id como parâmetro", async () => {
    const result = await chai.request(app).get('/teams/1');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_TEAM);
  });
  
  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findByPk as sinon.SinonStub).restore();
  });
})

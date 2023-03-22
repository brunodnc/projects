import * as sinon from "sinon";
import * as chai from "chai";
import { after, before } from 'mocha';

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Teams from "../database/models/Teams";

chai.use(chaiHttp);

const { expect } = chai;

const VALID_LEADERBOARD_INPUT = [
  {
    id: 1,
    teamName: 'time1',
    homeTeam: [{
        id: 1,
        homeTeam: 1,
        homeTeamGoals: 0,
        awayTeam: 2,
        awayTeamGoals: 1,
        inProgress: false,
    }],
    awayTeam: [{
        id: 2,
        homeTeam: 2,
        homeTeamGoals: 2,
        awayTeam: 1,
        awayTeamGoals: 2,
        inProgress: false,
    }]
  },
  {
    id: 2,
    teamName: 'time2',
    homeTeam: [{
        id: 2,
        homeTeam: 2,
        homeTeamGoals: 2,
        awayTeam: 1,
        awayTeamGoals: 2,
        inProgress: false,
    }],
    awayTeam: [{
        id: 1,
        homeTeam: 1,
        homeTeamGoals: 0,
        awayTeam: 2,
        awayTeamGoals: 1,
    }],
  },
];

const VALID_HOME_LEADERBOARD_INPUT = [
    {
      id: 1,
      teamName: 'time1',
      homeTeam: [{
          id: 1,
          homeTeam: 1,
          homeTeamGoals: 0,
          awayTeam: 2,
          awayTeamGoals: 1,
          inProgress: false,
      }],
    },
    {
      id: 2,
      teamName: 'time2',
      homeTeam: [{
          id: 2,
          homeTeam: 2,
          homeTeamGoals: 2,
          awayTeam: 1,
          awayTeamGoals: 2,
          inProgress: false,
      }],
    },
  ];

  const VALID_AWAY_LEADERBOARD_INPUT = [
    {
      id: 1,
      teamName: 'time1',
      awayTeam: [{
          id: 1,
          homeTeam: 2,
          homeTeamGoals: 0,
          awayTeam: 1,
          awayTeamGoals: 1,
          inProgress: false,
      }],
    },
    {
      id: 2,
      teamName: 'time2',
      awayTeam: [{
          id: 2,
          homeTeam: 1,
          homeTeamGoals: 2,
          awayTeam: 2,
          awayTeamGoals: 2,
          inProgress: false,
      }],
    },
  ];

const VALID_LEADERBOARD_OUTPUT = [
    {
        name: 'time1',
        totalPoints: '1',
        totalGames: '2',
        totalVictories: '0',
        totalDraws: '1',
        totalLosses: '1',
        goalsFavor: '2',
        goalsOwn: '3',
        goalsBalance: '-1',
        efficiency: '16.66'
      },
      {
        name: 'time2',
        totalPoints: '4',
        totalGames: '2',
        totalVictories: '1',
        totalDraws: '1',
        totalLosses: '0',
        goalsFavor: '3',
        goalsOwn: '2',
        goalsBalance: '1',
        efficiency: '44.44'
      }
];

const VALID_SIDE_LEADERBOARD_OUTPUT = [
    {
        name: 'time1',
        totalPoints: '0',
        totalGames: '1',
        totalVictories: '0',
        totalDraws: '0',
        totalLosses: '1',
        goalsFavor: '0',
        goalsOwn: '1',
        goalsBalance: '-1',
        efficiency: '00.00'
      },
      {
        name: 'time2',
        totalPoints: '1',
        totalGames: '1',
        totalVictories: '0',
        totalDraws: '1',
        totalLosses: '0',
        goalsFavor: '2',
        goalsOwn: '2',
        goalsBalance: '0',
        efficiency: '33.33'
      }
];

describe("Testa a rota /leaderboard", () => {
  before(async () => {
    sinon.stub(Teams, "findAll").resolves(VALID_LEADERBOARD_INPUT as unknown as Teams[]);
  });
  
  it("testa se a rota leaderboard retorna todos o leaderboard formatado corretamente ", async () => {
    const result = await chai.request(app).get('/leaderboard');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_LEADERBOARD_OUTPUT);
  });

  it("testa o retorno da rota /leaderboard/home", async () => {
    (Teams.findAll as sinon.SinonStub).restore();
    sinon.stub(Teams, "findAll").resolves(VALID_HOME_LEADERBOARD_INPUT as unknown as Teams[]);

    const result = await chai.request(app).get('/leaderboard/home');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_SIDE_LEADERBOARD_OUTPUT);
  });

  it("testa o retorno da rota /leaderboard/away", async () => {
    (Teams.findAll as sinon.SinonStub).restore();
    sinon.stub(Teams, "findAll").resolves(VALID_AWAY_LEADERBOARD_INPUT as unknown as Teams[]);

    const result = await chai.request(app).get('/leaderboard/home');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_SIDE_LEADERBOARD_OUTPUT);
  })
  
  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  });
})

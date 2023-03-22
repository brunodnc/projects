import { Request, Response } from 'express';
import { IMatch } from '../interfaces';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private service;

  constructor() {
    this.service = new MatchesService();
  }

  public async getMatches(req: Request, res: Response): Promise<Response> {
    try {
      if (Object.keys(req.query).length > 0) {
        const query = { inProgress: JSON.parse(req.query.inProgress as string) };
        console.log(`req query é: ${JSON.stringify(query)}`);
        const matches = await this.service.currentMatches(query as unknown as IMatch);
        console.log(`primeiro do array recebido: ${JSON.stringify(matches[0])}`);
        return res.status(200).json(matches);
      }
      const matches = await this.service.getMatches();
      return res.status(200).json(matches);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async getMatchById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const match = await this.service.getMatchById(Number(id));
      return res.status(200).json(match);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  sameTeamErrorMessage = {
    message: 'It is not possible to create a match with two equal teams',
  };

  public async createMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { body } = req;
      if (body.homeTeam === body.awayTeam) return res.status(422).json(this.sameTeamErrorMessage);
      const checkIfHomeTeamExists = await this.service.getMatchById(Number(body.homeTeam));
      const checkIfAwayTeamExists = await this.service.getMatchById(Number(body.awayTeam));
      if (!checkIfHomeTeamExists || !checkIfAwayTeamExists) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      const match = await this.service.createMatch(body);
      return res.status(201).json(match);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const update = await this.service.updateMatch(Number(id), {
        inProgress: false,
      } as IMatch);
      if (update) return res.status(200).json({ message: 'Finished' });
      return res.status(500).json({ message: 'could not find match' });
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { body } = req;
      const check = await this.service.matchInProgress(Number(id));
      if (check) {
        const update = await this.service.updateMatch(Number(id), body);
        return res.status(200).json({ update });
      }
      return res.status(500).json({ message: 'Match not in progress' });
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }
}

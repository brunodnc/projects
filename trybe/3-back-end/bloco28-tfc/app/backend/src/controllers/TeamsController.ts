import { Request, Response } from 'express';
import { ITeam } from '../interfaces';
import TeamsService from '../services/TeamsService';

export default class LoginController {
  private service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  public async getTeams(req: Request, res: Response): Promise<Response> {
    try {
      const teams: ITeam[] = await this.service.getTeams();
      return res.status(200).json(teams);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(Number(id));
      return res.status(200).json(team);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }
}

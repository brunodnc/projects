import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private service;

  constructor() {
    this.service = new LeaderboardService();
  }

  public async leaderboard(req: Request, res: Response) {
    try {
      const lb = await this.service.leaderboard();
      return res.status(200).json(lb);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async leaderboardHome(req: Request, res: Response) {
    try {
      const lb = await this.service.leaderboardSide('homeTeam');
      return res.status(200).json(lb);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async leaderboardAway(req: Request, res: Response) {
    try {
      const lb = await this.service.leaderboardSide('awayTeam');
      return res.status(200).json(lb);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }
}

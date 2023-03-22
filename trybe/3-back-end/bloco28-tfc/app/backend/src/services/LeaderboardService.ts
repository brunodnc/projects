import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { ILBformat, ILeaderboardTeam } from '../interfaces';
import LeaderboardTeam from './LeaderboardTeams';

export default class LeaderboardService {
  private teamsModel;
  private matchesModel;

  constructor() {
    this.teamsModel = Teams;
    this.matchesModel = Matches;
  }

  static sortLeaderboard(lbtArr: ILBformat[]) {
    return lbtArr
      .sort((a, b) => {
        if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
        if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
        if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
        if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
        if (a.goalsOwn !== b.goalsOwn) return a.goalsOwn - b.goalsOwn;
        return 1;
      });
  }

  static makeLeaderboard(matches: ILeaderboardTeam[]) {
    const leaderboard = matches
      .map((t: ILeaderboardTeam) => new LeaderboardTeam(t))
      .map((t: LeaderboardTeam) => ({
        name: t.name,
        totalPoints: t.getP(),
        totalGames: t.getJ(),
        totalVictories: t.getV(),
        totalDraws: t.getE(),
        totalLosses: t.getD(),
        goalsFavor: t.getGP(),
        goalsOwn: t.getGC(),
        goalsBalance: t.getSG(),
        efficiency: t.getEfficiency(),
      }));
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  }

  public async leaderboard() {
    const matches = await this.teamsModel.findAll({
      include: [
        {
          model: this.matchesModel,
          as: 'homeTeam',
          where: { inProgress: false },
        },
        {
          model: this.matchesModel,
          as: 'awayTeam',
          where: { inProgress: false },
        },
      ],
    });
    console.log(JSON.stringify(matches));
    return LeaderboardService.makeLeaderboard(matches);
  }

  public async leaderboardSide(sideTeam: string) {
    const matches: ILeaderboardTeam[] = await this.teamsModel.findAll({
      include: [
        {
          model: this.matchesModel,
          as: sideTeam,
          where: { inProgress: false },
        },
      ],
    });
    return LeaderboardService.makeLeaderboard(matches);
  }
}

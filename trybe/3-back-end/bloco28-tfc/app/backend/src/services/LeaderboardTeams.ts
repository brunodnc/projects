import { ILeaderboardTeam } from '../interfaces';

export default class LeaderboardTeam {
  private lbt: ILeaderboardTeam;
  private victories = 0;
  private draws = 0;
  private losses = 0;
  private gp = 0;
  private gc = 0;
  name: string;

  constructor(leaderboardTeam: ILeaderboardTeam) {
    this.lbt = leaderboardTeam;
    this.name = leaderboardTeam.teamName;
    this.lbt.homeTeam?.forEach((m) => {
      this.gp += m.homeTeamGoals;
      this.gc += m.awayTeamGoals;
      if (m.homeTeamGoals > m.awayTeamGoals) this.victories += 1;
      if (m.homeTeamGoals === m.awayTeamGoals) this.draws += 1;
      if (m.homeTeamGoals < m.awayTeamGoals) this.losses += 1;
    });
    this.lbt.awayTeam?.forEach((m) => {
      this.gp += m.awayTeamGoals;
      this.gc += m.homeTeamGoals;
      if (m.homeTeamGoals < m.awayTeamGoals) this.victories += 1;
      if (m.homeTeamGoals === m.awayTeamGoals) this.draws += 1;
      if (m.homeTeamGoals > m.awayTeamGoals) this.losses += 1;
    });
  }

  public getP(): number {
    return (this.victories * 3) + this.draws;
  }

  public getJ(): number {
    const sum = this.victories + this.draws + this.losses;
    return sum;
  }

  public getV(): number {
    return this.victories;
  }

  public getE(): number {
    return this.draws;
  }

  public getD(): number {
    return this.losses;
  }

  public getGP(): number {
    return this.gp;
  }

  public getGC(): number {
    return this.gc;
  }

  public getSG(): number {
    return this.gp - this.gc;
  }

  public getEfficiency(): number {
    const result = (this.getP() / (this.getJ() * 3)) * 100;

    return Number(result.toFixed(2));
  }
}

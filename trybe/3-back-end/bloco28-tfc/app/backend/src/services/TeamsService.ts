import Teams from '../database/models/Teams';
import { ITeam } from '../interfaces';

export default class TeamsService {
  private model;

  constructor() {
    this.model = Teams;
  }

  public async getTeams(): Promise<ITeam[]> {
    const allTeams: ITeam[] = await this.model.findAll();
    return allTeams;
  }

  public async getTeamById(id: number): Promise<ITeam | boolean> {
    const team: ITeam | null = await this.model.findByPk(id);
    if (team) return team;
    return false;
  }
}

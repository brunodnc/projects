import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IMatch } from '../interfaces';

export default class MatchesService {
  private model;

  constructor() {
    this.model = Matches;
  }

  public async getMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async getMatchById(id: number) {
    const match = await this.model.findByPk(id);
    return match;
  }

  public async currentMatches({ inProgress }: IMatch): Promise<IMatch[]> {
    console.log(`inProgress recebido é: ${typeof inProgress}`);
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async createMatch(match: IMatch) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const created: IMatch = await this.model.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    if (created) {
      return {
        id: created.id,
        ...match,
        inProgress: true,
      };
    }
    return false;
  }

  public async matchInProgress(id: number): Promise<boolean | undefined> {
    const match: IMatch | null = await this.model.findByPk(id);
    return match?.inProgress;
  }

  public async updateMatch(id: number, updateAttributes: IMatch) {
    try {
      const [update] = await this.model.update(updateAttributes, { where: { id } });
      if (update === 1) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

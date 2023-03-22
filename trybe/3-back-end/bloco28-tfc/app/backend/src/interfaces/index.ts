export interface IUser {
  id?: number;
  email: string;
  password?: string;
  username?: string;
  role?: string;
}

export interface ITeam {
  id?: number;
  teamName: string;
}

export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: {
    teamName: string;
  };
  teamAway?: {
    teamName: string;
  };
}

export interface ILeaderboardTeam {
  id: number;
  teamName: string;
  homeTeam?: IMatch[];
  awayTeam?: IMatch[];
}

export interface ILBformat {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

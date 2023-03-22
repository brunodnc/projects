import { DataTypes, Model } from 'sequelize';
import { ILeaderboardTeam } from '../../interfaces';
import db from '.';

class Teams extends Model implements ILeaderboardTeam {
  id: number;
  teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
  },
);

export default Teams;

import { Pool, ResultSetHeader } from 'mysql2/promise';
import { ILogin, IUser } from '../interfaces';

export default class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async registerUser(user: IUser): Promise<ILogin> {
    const { username, classe, level, password } = user;
    const query = `INSERT INTO Trybesmith.Users (username, classe, level, password) 
    VALUES (?, ?, ?, ?);`;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      query,
      [username, classe, level, password],
    );
    return { id: insertId, username };
  }

  async login(user: ILogin): Promise<ILogin[]> {
    const { username, password } = user;
    const query = `SELECT (id, username) 
    FROM Trybesmith.Users WHERE username = ? AND password = ?;`;
    const [data] = await this.connection.execute(query, [username, password]);
    return data as ILogin[];
  }
}

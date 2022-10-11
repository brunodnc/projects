import jwt from 'jsonwebtoken';
import { ILogin, IUser } from '../interfaces';
import connection from '../models/connection';
import UserModel from '../models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  async registerUser(user: IUser) {
    const registerSuccess = await this.model.registerUser(user);
    if (registerSuccess.id) {
      return jwt.sign(
        {
          id: registerSuccess.id,
          username: registerSuccess.username,
        },
        JWT_SECRET,
      );
    }
    return { error: 'Register error' };
  }

  async login(user: ILogin) {
    const [data] = await this.model.login(user);
    if (data) { return jwt.sign({ id: data.id, username: data.username }, JWT_SECRET); }
    return false;
  }
}

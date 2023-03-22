import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import { IUser } from '../interfaces';

export default class LoginService {
  private model;

  constructor() {
    this.model = Users;
  }

  public async login(user: IUser): Promise<string | boolean> {
    const result: IUser = (await this.model.findOne({
      where: { email: user.email },
    })) as IUser;
    if (!result) return false;
    const compare = await bcrypt.compare(user.password as string, result.password as string);
    if (!compare) return false;
    const token = LoginService.generateToken(user);
    return token;
  }

  public static generateToken(user: IUser): string {
    const JWTsecret = process.env.JWT_SECRET || 'jwt_secret';
    return jwt.sign({ email: user.email }, JWTsecret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
  }

  public async getRole(auth: string): Promise<string> {
    const JWTsecret = process.env.JWT_SECRET || 'jwt_secret';
    const { email } = jwt.verify(auth, JWTsecret) as IUser;
    const { role } = (await this.model.findOne({ where: { email } })) as Users;
    return role;
  }
}

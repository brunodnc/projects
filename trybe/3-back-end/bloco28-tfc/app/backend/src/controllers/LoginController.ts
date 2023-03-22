import { Request, Response } from 'express';
import { IUser } from '../interfaces';
import LoginService from '../services/LoginService';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const user: IUser = req.body;
      if (!user.email || !user.password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!(user.email.match(emailRegex)) || user.password.length <= 6) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      const token = await this.service.login(user);
      if (!token) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      return res.status(200).json({ token });
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async validate(req: Request, res: Response): Promise<Response> {
    try {
      const { authorization } = req.headers;
      const role = await this.service.getRole(authorization as string);
      return res.status(200).json({ role });
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }
}

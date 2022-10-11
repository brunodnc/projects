import { Request, Response } from 'express';
import { ILogin, IUser } from '../interfaces';
import UserService from '../services/UserService';

export default class UserController {
  service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async registerUser(req: Request, res: Response) {
    const user: IUser = req.body;
    const token = await this.service.registerUser(user);
    if (token) return res.status(201).json({ token });
  }

  async login(req: Request, res: Response) {
    const user: ILogin = req.body;
    if (!user.username) return res.status(400).json({ message: '"username" is required' });
    if (!user.password) return res.status(400).json({ message: '"password" is required' });
    const token = await this.service.login(user);
    if (!token) return res.status(401).json({ message: 'Username or password invalid' });
    if (token) return res.status(200).json({ token });
  }
}

import { NextFunction, Request, Response, Router } from 'express';
import jwt = require('jsonwebtoken');
import MatchesController from '../controllers/MatchesController';
import Users from '../database/models/Users';
import { IUser } from '../interfaces';

const matchesRouter = Router();

const controller: MatchesController = new MatchesController();

// token auth
const invalidTokenError = { message: 'Token must be a valid token' };
const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json(invalidTokenError);
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  try {
    const user = jwt.verify(authorization, secret) as IUser;
    const findUser = await Users.findOne({ where: { email: user.email } }) as IUser;
    if (findUser) {
      return next();
    }
    return res.status(401).json(invalidTokenError);
  } catch ({ message }) {
    return res.status(401).json(invalidTokenError);
  }
};

// routes
matchesRouter.get('/', controller.getMatches.bind(controller));
matchesRouter.get('/:id', controller.getMatchById.bind(controller));
matchesRouter.post('/', authToken, controller.createMatch.bind(controller));
matchesRouter.patch('/:id', controller.updateMatch.bind(controller));
matchesRouter.patch('/:id/finish', controller.finishMatch.bind(controller));

export default matchesRouter;

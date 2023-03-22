import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const controller: LeaderboardController = new LeaderboardController();

leaderboardRouter.get('/', controller.leaderboard.bind(controller));
leaderboardRouter.get('/home', controller.leaderboardHome.bind(controller));
leaderboardRouter.get('/away', controller.leaderboardAway.bind(controller));

export default leaderboardRouter;

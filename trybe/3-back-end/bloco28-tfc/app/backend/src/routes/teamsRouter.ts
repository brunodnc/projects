import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();

const controller: TeamsController = new TeamsController();

teamsRouter.get('/', controller.getTeams.bind(controller));
teamsRouter.get('/:id', controller.getTeamById.bind(controller));

export default teamsRouter;

import { Router } from 'express';

import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

const motorcycleController = new MotorcycleController();

motorcycleRoutes.get('/', (req, res) => motorcycleController.getAll(req, res));
motorcycleRoutes.get('/:id', (req, res) => motorcycleController.getById(req, res));
motorcycleRoutes.post('/', (req, res) => motorcycleController.create(req, res));

export default motorcycleRoutes;

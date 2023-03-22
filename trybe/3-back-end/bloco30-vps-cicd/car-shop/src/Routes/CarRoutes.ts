import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();
const carController = new CarController();

carRoutes.get('/', (req, res) => carController.getAll(req, res));
carRoutes.get('/:id', (req, res) => carController.getById(req, res));
carRoutes.post('/', (req, res) => carController.create(req, res));
carRoutes.put('/:id', (req, res) => carController.update(req, res));

export default carRoutes;
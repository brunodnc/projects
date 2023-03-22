import { Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private service: MotorcycleService;

  constructor() {
    this.service = new MotorcycleService();
  }

  public async getAll(req: Request, res: Response) {
    try {
      const motorcycles = await this.service.getAll();
      return res.status(200).json(motorcycles);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.getById(id);
      if (!motorcycle) return res.status(404).json({ message: 'Motorcycle not found' });
      return res.status(200).json(motorcycle);
    } catch ({ message }) {
      return res.status(422).json({ message });
    }
  }

  public async create(req: Request, res: Response) {
    const motorcycle: IMotorcycle = req.body;
    res.statusCode = 201;
    const newMotorcycle = await this.service.createMotorcycle(motorcycle);
    return res.status(201).json(newMotorcycle);
  }
}

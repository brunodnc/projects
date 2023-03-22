import { Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private service: CarService;

  constructor() {
    this.service = new CarService();
  }

  public async getAll(req: Request, res: Response) {
    try {
      const cars = await this.service.getAll();
      return res.status(200).json(cars);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const car = await this.service.getById(id);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      return res.status(200).json(car);
    } catch ({ message }) {
      return res.status(422).json({ message });
    }
  }

  public async create(req: Request, res: Response) {
    const car: ICar = req.body;
    const newCar = await this.service.createCar(car);
    return res.status(201).json(newCar);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const car = req.body;
    try {
      const updatedCar = await this.service.update(id, car);
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
      return res.status(200).json(updatedCar);
    } catch ({ message }) {
      return res.status(422).json({ message });
    }
  }
}

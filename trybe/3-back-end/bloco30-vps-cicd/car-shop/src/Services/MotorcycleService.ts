import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  constructor(private motorcycleODM = new MotorcycleODM()) {}
  createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async getAll() {
    const motorcycles = await this.motorcycleODM.getAll();
    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getById(id: string) {
    const motorcycle = await this.motorcycleODM.getById(id);
    if (!motorcycle) return false;
    return this.createMotorcycleDomain(motorcycle);
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }
}

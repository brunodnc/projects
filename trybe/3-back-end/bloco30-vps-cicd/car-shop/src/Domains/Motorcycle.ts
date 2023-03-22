import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  getCategory() {
    return this.category;
  }

  getEngineCapacity() {
    return this.engineCapacity;
  }

  setCategory(category: 'Street' | 'Custom' | 'Trail') {
    this.category = category;
  }

  setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }
}

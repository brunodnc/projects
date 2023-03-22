import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  constructor(private carODM = new CarODM()) {}
  createCarDomain(car: ICar): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async getAll() {
    const cars = await this.carODM.getAll();
    return cars.map((car) => this.createCarDomain(car));
  }

  public async getById(id: string) {
    const car = await this.carODM.getById(id);
    if (!car) return false;
    return this.createCarDomain(car);
  }

  public async createCar(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async update(id: string, car: ICar) {
    const updatedCar = await this.carODM.update(id, car);
    if (!car) return false;
    return this.createCarDomain(updatedCar as ICar);
  }
}

import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

const car = {
  id: '6348513f34c123abcad040b2',
  model: 'Toyota MR2',
  year: 1967,
  color: 'Black',
  status: true,
  buyValue: 6000,
  doorsQty: 4,
  seatsQty: 5,
};

const body = {
  model: 'Toyota MR2',
  year: 1967,
  color: 'Black',
  status: true,
  buyValue: 6000,
  doorsQty: 4,
  seatsQty: 5,
};

const instance = new Car(car);

describe('CarService tests', () => {
  afterEach(sinon.restore);

  const service = new CarService();

  it('test car insertion', async function () {
    sinon.stub(Model, 'create').resolves(car);
    const result = await service.createCar(body);

    expect(result).to.be.deep.equal(instance);
  });

  it('test car get all', async function () {
    sinon.stub(Model, 'find').resolves([car, car]);
    const result = await service.getAll();
    expect(result).to.be.deep.equal([instance, instance]);
  });

  it('test car get by id', async function () {
    sinon.stub(Model, 'findOne').resolves(car);
    const result = await service.getById(car.id);
    expect(result).to.be.deep.equal(instance);
  });

  it('test car update', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(car);
    const result = await service.update(car.id, body);
    expect(result).to.be.deep.equal(instance);
  });
});

import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const motorcycle = {
  id: '6348513f34c123abcad040b2',
  model: 'ninja',
  year: 2022,
  color: 'Yellow',
  status: true,
  buyValue: 35.0,
  category: 'Street' as 'Street' | 'Custom' | 'Trail',
  engineCapacity: 600,
};

const body = {
  model: 'ninja',
  year: 2022,
  color: 'Yellow',
  status: true,
  buyValue: 35.0,
  category: 'Street' as 'Street' | 'Custom' | 'Trail',
  engineCapacity: 600,
};

const instance = new Motorcycle(motorcycle);

describe('MotorcycleService tests', () => {
  afterEach(sinon.restore);

  const service = new MotorcycleService();

  it('test motorcycle insertion', async function () {
    sinon.stub(Model, 'create').resolves(motorcycle);
    const result = await service.createMotorcycle(body);

    expect(result).to.be.deep.equal(instance);
  });

  // it('test motorcycle get all', async function () {
  //   sinon.stub(Model, 'find').resolves([motorcycle, motorcycle]);
  //   const result = await service.getAll();
  //   expect(result).to.be.deep.equal([instance, instance]);
  // });

  it('test motorcycle get by id', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycle);
    const result = await service.getById(motorcycle.id);
    expect(result).to.be.deep.equal(instance);
  });
});

import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String },
      year: { type: Number },
      color: { type: String },
      status: { type: Boolean },
      buyValue: { type: Number },
      category: { type: String },
      engineCapacity: { type: Number },
    });
    super(schema, 'Motorcycles');
  }
}

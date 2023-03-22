import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String },
      year: { type: Number },
      color: { type: String },
      status: { type: Boolean },
      buyValue: { type: Number },
      doorsQty: { type: Number },
      seatsQty: { type: Number },
    });
    super(schema, 'Cars');
  }

//   add specifcs methods
}

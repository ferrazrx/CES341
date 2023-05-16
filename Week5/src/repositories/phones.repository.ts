import { injectable } from 'inversify';
import { Acknowledge, Repository } from './repository.interface';
import mongoose from 'mongoose';
import { Phone } from '../models/Phone';
import { PhoneModel } from '../schemas/phone.schema';

@injectable()
export class PhonesRepository implements Repository<Phone> {
  constructor() {
    this.run();
  }

  async run() {
    if (!process.env.MONGO_DB_ACCESS_POINT) {
      throw new Error('No connection string provide for MongoDB, please verify mongoDB connection settings.');
    }

    await mongoose.connect(process.env.MONGO_DB_ACCESS_POINT);
  }

  async all(): Promise<Phone[]> {
    return await PhoneModel.find({});
  }

  async createOne(phone: Phone): Promise<Phone> {
    return await PhoneModel.create(phone);
  }

  async findByID(_id: string): Promise<Phone> {
    throw new Error('Not implemented');
  }

  async updateOne(_id: string, data: Phone): Promise<Phone> {
    throw new Error('Not implemented');
  }

  async deleteOne(_id: string): Promise<Acknowledge> {
    throw new Error('Not implemented');
  }
}

import { injectable } from 'inversify';
import { Acknowledge, Repository } from './repository.interface';
import mongoose from 'mongoose';
import { Phone } from '../models/Phone';
import { PhoneModel } from '../schemas/phone.schema';
import { DatabaseError } from '../errors/Database';

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
    try {
      return await PhoneModel.find({});
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to retrieve all phone numbers.');
    }
  }

  async createOne(phone: Phone): Promise<Phone> {
    try {
      return await PhoneModel.create(phone);
    } catch (e) {
      console.log(e);
      throw new DatabaseError('Something went wrong when trying to create a new phone number.');
    }
  }

  async findByID(_id: string): Promise<Phone | null> {
    try {
      return await PhoneModel.findById(_id);
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to retrieve phone number.');
    }
  }

  async updateOne(_id: string, data: Phone): Promise<Phone | null> {
    try {
      await PhoneModel.updateOne({ _id }, data, { upsert: true });
      return await this.findByID(_id);
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to update phone number.');
    }
  }

  async deleteOne(_id: string): Promise<Acknowledge> {
    try {
      const result = await PhoneModel.deleteOne({ _id });
      return { acknowledged: result.acknowledged, count: result.deletedCount };
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to delete phone number.');
    }
  }
}

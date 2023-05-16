import { injectable } from 'inversify';
import { Acknowledge, Repository } from './repository.interface';
import { User } from '../models/User';
import mongoose from 'mongoose';
import { UserModel } from '../schemas/user.schema';

@injectable()
export class UsersRepository implements Repository<User> {
  constructor() {
    this.run();
  }

  async run() {
    if (!process.env.MONGO_DB_ACCESS_POINT) {
      throw new Error('No connection string provide for MongoDB, please verify mongoDB connection settings.');
    }

    await mongoose.connect(process.env.MONGO_DB_ACCESS_POINT);
  }

  async all(): Promise<User[]> {
    return await UserModel.find({});
  }

  async createOne(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async findByID(_id: string): Promise<User> {
    throw new Error('Not implemented');
  }

  async updateOne(_id: string, data: User): Promise<User> {
    throw new Error('Not implemented');
  }

  async deleteOne(_id: string): Promise<Acknowledge> {
    throw new Error('Not implemented');
  }
}

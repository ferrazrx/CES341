import { injectable } from 'inversify';
import { Acknowledge, Repository } from './repository.interface';
import { User } from '../models/User';
import mongoose from 'mongoose';
import { UserModel } from '../schemas/user.schema';
import { DatabaseError } from '../errors/Database';
import { MongoServerError } from 'mongodb';

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
    try {
      return await UserModel.find({});
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to retrieve all users.');
    }
  }

  async createOne(user: User): Promise<User> {
    try {
      return await UserModel.create(user);
    } catch (e) {
      if (e instanceof MongoServerError) {
        switch (e.code) {
          case 11000:
            throw new DatabaseError(`Email ${user.email} already in use. Try a different email.`);

          default:
            throw new DatabaseError('Something went wrong when trying to create a new user.');
        }
      }
      throw new DatabaseError('Something went wrong when trying to create a new user.');
    }
  }

  async findByID(_id: string): Promise<User | null> {
    try {
      return await UserModel.findById({ _id });
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to retrieve user.');
    }
  }

  async updateOne(_id: string, data: User): Promise<User | null> {
    try {
      await UserModel.updateOne({ _id }, data, { upsert: true });
      return await this.findByID(_id);
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to user.');
    }
  }

  async deleteOne(_id: string): Promise<Acknowledge> {
    try {
      const result = await UserModel.deleteOne({ _id });
      return { acknowledged: result.acknowledged, count: result.deletedCount };
    } catch (e) {
      throw new DatabaseError('Something went wrong when trying to delete phone number.');
    }
  }
}

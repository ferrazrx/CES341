import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { TYPES } from '../app.types';
import { Repository } from '../repositories/repository.interface';
import { User } from '../models/User';
import { BcryptError } from '../errors/bcryptError';

@injectable()
export class UsersService {
  constructor(@inject(TYPES.userRepository) private userRepository: Repository<User>) {}

  async getAll() {
    return await this.userRepository.all();
  }

  async findByID(_id: string) {
    return await this.userRepository.findByID(_id);
  }

  async createOne(data: User) {
    const hash = await bcrypt.hash(data.password, 10).catch((e) => {
      throw new BcryptError('Error when creating password. ' + e);
    });
    return await this.userRepository.createOne({ ...data, password: hash });
  }

  async updateOne(_id: string, data: User) {
    return await this.userRepository.updateOne(_id, data);
  }

  async deleteOne(_id: string) {
    return await this.userRepository.deleteOne(_id);
  }
}

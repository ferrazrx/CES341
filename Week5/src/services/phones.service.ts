import { inject, injectable } from 'inversify';
import { TYPES } from '../app.types';
import { Repository } from '../repositories/repository.interface';
import { Phone } from '../models/Phone';

@injectable()
export class PhonesService {
  constructor(@inject(TYPES.phoneRepository) private phoneRepository: Repository<Phone>) {}

  async getAll() {
    return await this.phoneRepository.all();
  }

  async findByID(_id: string) {
    return await this.phoneRepository.findByID(_id);
  }

  async createOne(data: Phone) {
    return await this.phoneRepository.createOne(data);
  }

  async updateOne(_id: string, data: Phone) {
    return await this.phoneRepository.updateOne(_id, data);
  }

  async deleteOne(_id: string) {
    return await this.phoneRepository.deleteOne(_id);
  }
}

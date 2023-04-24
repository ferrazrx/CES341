import { inject, injectable } from "inversify";
import { TYPES } from "../app.types";
import { Repository } from "../repositories/repository.interface";
import { Contact } from "../models/contacts";

@injectable()
export class ContactsService {
    constructor(
        @inject(TYPES.ContactRepository)  private contactRepository: Repository<Contact>,
    ){}

    async getAll(){
        return await this.contactRepository.all();
    }

    async findByID(_id: string){
        return await this.contactRepository.findByID(_id);
    }
}
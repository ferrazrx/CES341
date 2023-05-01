import { Container } from "inversify";
import { TYPES } from "./app.types";
import { Repository } from "./src/repositories/repository.interface";
import { Contact } from "./src/models/contacts";
import { ContactRepository } from "./src/repositories/contacts.repository";
import { ContactsService } from "./src/services/contacts.service";

const myContainer = new Container();
myContainer.bind<Repository<Contact>>(TYPES.ContactRepository).to(ContactRepository);
myContainer.bind<ContactsService>(TYPES.ContactService).to(ContactsService);

export { myContainer };
import { Container } from "inversify";
import { TYPES } from "./app.types";
import { Repository } from "./repositories/repository.interface";
import { Contact } from "./models/contacts";
import { ContactRepository } from "./repositories/contacts.repository";
import { ContactsService } from "./services/contacts.service";

const myContainer = new Container();
myContainer.bind<Repository<Contact>>(TYPES.ContactRepository).to(ContactRepository);
myContainer.bind<ContactsService>(TYPES.ContactService).to(ContactsService);

export { myContainer };
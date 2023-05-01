import { Router } from 'express';
import { ContactsController } from '../controllers/contacts.controller';
import { myContainer } from '../inversify.config';
import { ContactsService } from '../services/contacts.service';
import { TYPES } from '../app.types';
export const contactsRouter = Router();

const contactsController = new ContactsController(myContainer.get<ContactsService>(TYPES.ContactService));

/* GET Routes. */
contactsRouter.get('/', contactsController.getAll);
contactsRouter.get('/:id', contactsController.findByID);

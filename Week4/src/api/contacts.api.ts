import { Router } from 'express';
import { ContactsController } from '../controllers/contacts.controller';
import { myContainer } from '../inversify.config';
import { ContactsService } from '../services/contacts.service';
import { TYPES } from '../app.types';

export const contactsRouter = Router();

const contactsController = new ContactsController(myContainer.get<ContactsService>(TYPES.ContactService));

/* GET Routes. */
contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', (req, res) => {
  //  #swagger.parameters['id'] = { required: true, type: 'string', description: 'Contact Object(ID) String' }
  contactsController.findByID(req, res);
});

/* POST Routes. */
contactsRouter.post('/', (req, res) => {
  /*  #swagger.parameters['obj'] = {
        required: true,
        in: 'body',
        description: 'New contact info',
        schema: {
            firstName: "Test",
            lastName: "Example",
            email: "test@gmail.com",
            favoriteColor: "black",
            birthday: "01/01/1900"
        }
    } */
  contactsController.createOne(req, res);
});

/* PUT Routes. */
contactsRouter.put('/:id', (req, res) => {
  /*  #swagger.parameters['obj'] = {
        required: true,
        in: 'body',
        description: 'Update existed contact info',
        schema: {
            _id: "123",
            firstName: "Test",
            lastName: "Example",
            email: "test@gmail.com",
            favoriteColor: "black",
            birthday: "01/01/1900"
        }
    } */
  contactsController.updateOne(req, res);
});

/* DELETE Routes. */
contactsRouter.delete('/:id', (req, res) => {
  //  #swagger.parameters['id'] = { required: true, type: 'string',  description: 'Delete contact by Object(ID) String' }
  contactsController.deleteOne(req, res);
});

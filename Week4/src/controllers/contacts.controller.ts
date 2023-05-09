import { Request, Response } from 'express';
import { ContactsService } from '../services/contacts.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../app.types';

@injectable()
export class ContactsController {
  constructor(@inject(TYPES.ContactService) private contactService: ContactsService) {}

  getAll = async (req: Request, res: Response) => {
    /* #swagger.path = '/forcedEndpoint/{id}' */
    res.setHeader('Content-Type', 'application/json');
    try {
      const allContacts = await this.contactService.getAll();
      res.send(JSON.stringify(allContacts));
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  };

  findByID = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const contact = await this.contactService.findByID(req.params.id);
      res.send(JSON.stringify(contact));
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  };

  createOne = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const contact = await this.contactService.createOne(req.body);
      res.send(JSON.stringify(contact));
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  };

  updateOne = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const contact = await this.contactService.updateOne(req.params.id, req.body);
      res.send(JSON.stringify(contact));
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const result = await this.contactService.deleteOne(req.params.id);
      res.send(JSON.stringify(result));
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  };
}

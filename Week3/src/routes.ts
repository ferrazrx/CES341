import { Express, Router } from 'express';
import { contactsRouter } from './api/contacts.api';

export const routes = (app: Express) => {
  const routes = Router();

  app.use('/contacts', contactsRouter);

  return routes;
};

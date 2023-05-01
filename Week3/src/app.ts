import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import helmet from 'helmet';
import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { contactsRouter } from './api/contacts.api';

const app: Express = express();

// Security layer
app.use(helmet());

app.use(bodyParser.json()).use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

const port = process.env.PORT;

app.use('/contacts', contactsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

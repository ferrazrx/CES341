import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import helmet from 'helmet';
import express, { Express } from 'express';
import { routes } from './routes';
import bodyParser from 'body-parser';

const app: Express = express();

// Security layer
app.use(helmet());

app.use(bodyParser.json());

app.use('/', routes(app));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

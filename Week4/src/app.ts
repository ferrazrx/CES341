import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import helmet from 'helmet';
import express, { Express } from 'express';
import { routes } from './routes';
import bodyParser from 'body-parser';
import swaggerDocument from '../swagger-output.json';
import * as swaggerUi from 'swagger-ui-express';

const app: Express = express();

// Security layer
app.use(helmet());

app.use(bodyParser.json());

app.use('/', routes(app));

/* API Docs */
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
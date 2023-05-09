import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import helmet from 'helmet';
import express, { Express } from 'express';
import { routes } from './routes';
import bodyParser from 'body-parser';
import swaggerDocument from '../swagger-output.json';
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';

const app: Express = express();

// Security layer
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['*'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ['*'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'"],
      },
    },
  }),
);

const origin = {
  origin: '*',
};
app.use(cors(origin));

app.use(bodyParser.json());

app.use('/', routes(app));

/* API Docs */
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

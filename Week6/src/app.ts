import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import helmet from 'helmet';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import swaggerDocument from '../swagger-output.json';
import * as swaggerUi from 'swagger-ui-express';
import { router as userRouter } from './api/users.api';
import { router as phoneRouter } from './api/phones.api';
import cors from 'cors';
import { returnError } from './middlewares/error';

const app: Express = express();

// Security layer
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['*'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ['*'],
      },
    },
  }),
);

const origin = {
  origin: '*',
};
app.use(cors(origin));

app.use(bodyParser.json());

app.use('/', phoneRouter);
app.use('/', userRouter);
app.use(returnError);

/* API Docs */
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

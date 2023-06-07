import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import swaggerDocument from '../swagger-output.json';
import * as swaggerUi from 'swagger-ui-express';
import { router as userRouter } from './api/users.api';
import { router as phoneRouter } from './api/phones.api';
import cors from 'cors';
import { returnError } from './middlewares/error';
import { env } from './env';
import { authRouter } from './api/auth.api';

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

// *** Body Parser ***
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse cookies
app.use(cookieParser());

app.use('/', phoneRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use(returnError);

/* API Docs */
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = env.PORT || 8082;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

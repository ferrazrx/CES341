import { Router, Request, Response, NextFunction } from 'express';
import { myContainer } from '../inversify.config';
import { TYPES } from '../app.types';

import { isLoggedIn } from '../middlewares/isLoggedIn';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

export const authRouter = Router();

const authController = new AuthController(myContainer.get<AuthService>(TYPES.authService));

/* GET Routes. */
authRouter.get('/logout', authController.logOut);
authRouter.get('/me', isLoggedIn, authController.me);

/* POST Routes. */
authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  /*  #swagger.parameters['obj'] = {
        required: true,
        in: 'body',
        description: 'Log in',
        schema: {
             "email": "jonh1@gmail.com",
           "password": "12345678",
        }
    } */

  authController.logIn(req, res, next);
});

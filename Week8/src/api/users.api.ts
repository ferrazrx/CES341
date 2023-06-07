import * as userController from '../controllers/users.controller';
import { body } from 'express-validator';
import { NextFunction, Router, Request, Response } from 'express';

const userValidation = () => [
  body('firstName').isLength({ min: 3 }),
  body('lastName').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];
export const router = Router();
router.get('/users', (rej, res, next) => {
  return userController.getAll(rej, res, next);
});

router.post('/users', userValidation(), (rej: Request, res: Response, next: NextFunction) => {
  /*  #swagger.parameters['obj'] = {
        required: true,
        in: 'body',
        description: 'New phone number',
        schema: {
            "firstName": "John",
            "lastName": "Doe",
            "email": "jonh1@gmail.com",
            "password": "12345678",
            "createdAt": "01/01/1900",
            "updatedAt": "01/01/1900",
            "thumbnail": "1.png"
        }
    } */

  return userController.createOne(rej, res, next);
});
router.put('/users/:id', userValidation(), (rej: Request, res: Response, next: NextFunction) => {
  return userController.updateOne(rej, res, next);
});

router.delete('/users/:id', (rej, res, next) => {
  return userController.deleteOne(rej, res, next);
});

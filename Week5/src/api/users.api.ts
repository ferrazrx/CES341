import { Router } from 'express';
import * as userController from '../controllers/users.controller';

export const router = Router();
router.get('/users', (rej, res) => {
  return userController.getAll(rej, res);
});
router.post('/users', (rej, res) => {
  /*  #swagger.parameters['obj'] = {
        required: true,
        in: 'body',
        description: 'New phone number',
        schema: {
            firstName: "Dart",
            lastName: "Vader",
            email: "email@email.com",
            password: "123",
            createdAt: "01/01/2023",
            updatedAt: "01/01/2023",
            thumbnail: "1.png",
        }
    } */

  return userController.createOne(rej, res);
});

import * as phonesController from '../controllers/phones.controller';
import { Router } from 'express';

export const router = Router();
router.get('/phones', (req, res) => {
  return phonesController.getAll(req, res);
});
router.post('/phones', (rej, res) => {
  /*  #swagger.parameters['obj'] = {
        required: true,
        in: 'body',
        description: 'New phone number',
        schema: {
            name: "Dart Vader",
            phone_number: "123",
            createdAt: "01/01/2023",
            updatedAt: "01/01/2023",
            owner: "123",
        }
    } */
  return phonesController.createOne(rej, res);
});

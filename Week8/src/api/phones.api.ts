import { body } from 'express-validator';
import * as phonesController from '../controllers/phones.controller';
import { NextFunction, Router, Request, Response } from 'express';

export const router = Router();
const phonesValidation = () => [
  body('name').isLength({ min: 3 }),
  body('phone_number').isNumeric().isLength({ min: 7 }),
];
router.get('/phones', (req, res, next) => {
  return phonesController.getAll(req, res, next);
});
router.post('/phones', phonesValidation(), (req: Request, res: Response, next: NextFunction) => {
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
  return phonesController.createOne(req, res, next);
});
router.put('/phones/:id', phonesValidation(), (rej: Request, res: Response, next: NextFunction) => {
  return phonesController.updateOne(rej, res, next);
});

router.delete('/phones/:id', (rej, res, next) => {
  return phonesController.deleteOne(rej, res, next);
});

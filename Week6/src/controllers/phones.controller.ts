import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../app.types';
import { myContainer } from '../inversify.config';
import { PhonesService } from '../services/phones.service';
import { validationResult } from 'express-validator';

const phonesService = myContainer.get<PhonesService>(TYPES.phoneService);

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const phones = await phonesService.getAll();
    res.send(JSON.stringify(phones));
  } catch (e) {
    next(e);
  }
};

export const createOne = async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const phones = await phonesService.createOne(req.body);
      res.send(JSON.stringify(phones));
      return;
    }
    res.send({ errors: result.array() });
  } catch (e) {
    next(e);
  }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const phone = await phonesService.updateOne(req.params.id, req.body);
      res.send(JSON.stringify(phone));
    }
    res.send({ errors: result.array() });
  } catch (e) {
    next(e);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const acknowledged = await phonesService.deleteOne(req.params.id);
    res.send(JSON.stringify(acknowledged));
  } catch (e) {
    next(e);
  }
};

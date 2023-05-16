import { Request, Response } from 'express';
import { TYPES } from '../app.types';
import { myContainer } from '../inversify.config';
import { PhonesService } from '../services/phones.service';

const phonesService = myContainer.get<PhonesService>(TYPES.phoneService);

export const getAll = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const phones = await phonesService.getAll();
    res.send(JSON.stringify(phones));
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
};

export const createOne = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const phones = await phonesService.createOne(req.body);
    res.send(JSON.stringify(phones));
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
};

//  export const  findByID = async (req: Request, res: Response) => {};

//  export const  updateOne = async (req: Request, res: Response) => {};

//  export const  deleteOne = async (req: Request, res: Response) => {};

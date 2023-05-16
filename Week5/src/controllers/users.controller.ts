import { Request, Response } from 'express';
import { TYPES } from '../app.types';
import { myContainer } from '../inversify.config';
import { UsersService } from '../services/users.service';

const usersService = myContainer.get<UsersService>(TYPES.userService);

export const getAll = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const users = await usersService.getAll();
    res.send(JSON.stringify(users));
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
};

export const createOne = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const user = await usersService.createOne(req.body);
    res.send(JSON.stringify(user));
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
};

//  export const  findByID = async (req: Request, res: Response) => {};

//  export const  updateOne = async (req: Request, res: Response) => {};

//  export const  deleteOne = async (req: Request, res: Response) => {};

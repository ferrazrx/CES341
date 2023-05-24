import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../app.types';
import { myContainer } from '../inversify.config';
import { UsersService } from '../services/users.service';
import { validationResult } from 'express-validator';

const usersService = myContainer.get<UsersService>(TYPES.userService);

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const users = await usersService.getAll();
    res.send(JSON.stringify(users));
  } catch (e) {
    next(e);
  }
};

export const createOne = async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const user = await usersService.createOne(req.body);
      res.send(JSON.stringify(user));
    }
    res.send({ errors: result.array() });
  } catch (e) {
    next(e);
  }
};

export const findByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.findByID(req.params.id);
    res.send(JSON.stringify(user));
  } catch (e) {
    next(e);
  }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const user = await usersService.updateOne(req.params.id, req.body);
      res.send(JSON.stringify(user));
    }
    res.send({ errors: result.array() });
  } catch (e) {
    next(e);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const acknowledged = await usersService.deleteOne(req.params.id);
    res.send(JSON.stringify(acknowledged));
  } catch (e) {
    next(e);
  }
};

import { NextFunction, Request, Response } from 'express';
import { myContainer } from '../inversify.config';
import { TYPES } from '../app.types';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

export interface RequestWithUser extends Request {
  user: User | null;
}

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.access_token && !req.headers.access_token) {
    res.status(400).send('Invalid Token!');
    return;
  }
  try {
    const token = req.cookies.access_token || req.headers.access_token;

    const authService = myContainer.get<AuthService>(TYPES.authService);
    const user = await authService.getUserFromToken(token);
    if (!user) {
      res.status(400).send('Invalid Token!');
      return;
    }
    (req as RequestWithUser).user = user;
    next();
  } catch (e) {
    res.status(400).send('Invalid Token!');
  }
}
